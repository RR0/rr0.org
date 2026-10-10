/*
 * rr0.org service worker. Plain JavaScript because it runs as it is, in the browser; copied to the
 * site root by build.ts, since a worker's scope is the directory it is served from.
 *
 * The rule it follows: ONLINE, NOTHING CHANGES. The network always answers first, so a reader gets
 * the page as deployed, exactly as without a worker; the cache is only what is served when the
 * network cannot answer (no signal, a train, lie-fi). A cache that answered before the network could
 * show last week's page on today's site (the lesson of the unversioned /lib/ files ufoathome.org once
 * had kept for a week).
 *
 * What is kept is what the reader has opened, not the site: it holds some 10 000 pages and 13 000
 * files, which no one wants copied into their browser. A small trunk is fetched at installation (the
 * home page, the style sheets, the site search and its index), and every page read afterwards is kept
 * behind it, oldest forgotten first once the caps below are reached.
 *
 * Only this site's own GET requests are handled. Cross-origin calls (embedded videos, maps, fonts)
 * are left to the browser, and so are range requests (audio, video), which the Cache API cannot
 * answer correctly.
 */
class RR0Worker {

  /** The trunk: what a page needs to look like itself, and the search. Best effort, file by file. */
  static PRECACHE = [
    "/", "/offline.html", "/manifest.json", "/favicon.ico", "/apple-touch-icon.png", "/nav.js",
    "/rr0.css", "/map.css", "/diagram.css", "/print.css", "/figure.css", "/section.css", "/table.css",
    "/nav.css", "/math.css", "/link.css", "/quote.css", "/footer.css", "/index.css",
    "/search/SearchComponent.mjs", "/search/search.css", "/search/index.json",
    "/time/DualRangeComponent.mjs", "/tag/TagsComponent.mjs"
  ]

  /** Pages (HTML documents), kept by origin and path. */
  static PAGES = "rr0-pages"

  /** Everything a page is made of: styles, scripts, images, data. */
  static ASSETS = "rr0-assets"

  /** What to show offline for a page that was never opened. */
  static OFFLINE = "/offline.html"

  /** How long a cached copy waits for a slow network before it is served instead. */
  static PATIENCE_MS = 5000

  static MAX_PAGES = 600

  static MAX_ASSETS = 2500

  /** A file above this size is not kept: one scan or one PDF is not worth the quota. The search index
   * (1.2 MB) is under it, and is also in the trunk. */
  static MAX_BYTES = 2 * 1024 * 1024

  static MAX_KEPT_AT_ONCE = 300

  /** Documents and media: big, rarely re-read, and often served in ranges. */
  static SKIPPED = /\.(pdf|zip|mp3|mp4|ogg|wav|webm|mov|avi|doc|docx|ppt|pptx|xls|xlsx|epub|bin|gz)$/i

  /** A response worth keeping: complete, from here, and not the answer to a redirect (a redirected
   * response given back for a navigation is an error in every browser). */
  static storable(response) {
    return response.ok && response.status === 200 && response.type === "basic" && !response.redirected
  }

  async install() {
    const cache = await caches.open(RR0Worker.ASSETS)
    // Individually: one missing file must not keep the worker from installing.
    await Promise.allSettled(RR0Worker.PRECACHE.map(async path => {
      const response = await fetch(new Request(new URL(path, self.location.origin).href, {cache: "reload"}))
      if (RR0Worker.storable(response)) {
        await cache.put(path, response)
      }
    }))
  }

  async activate() {
    for (const name of await caches.keys()) {
      if (name.startsWith("rr0-") && name !== RR0Worker.PAGES && name !== RR0Worker.ASSETS) {
        await caches.delete(name)
      }
    }
  }

  /** The response to a fetch event, or undefined to leave the request to the browser. */
  respond(event) {
    const request = event.request
    if (request.method !== "GET" || request.headers.has("range")) {
      return undefined
    }
    const url = new URL(request.url)
    if (url.origin !== self.location.origin || url.pathname === "/sw.js" || RR0Worker.SKIPPED.test(url.pathname)) {
      return undefined
    }
    if (request.mode === "navigate") {
      return this.navigation(event, url)
    }
    return this.networkFirst(event, request, request, RR0Worker.ASSETS, RR0Worker.MAX_ASSETS)
  }

  /** A page is kept under its path alone: `/search?q=…` and `/page.html#part` are the same document. */
  async navigation(event, url) {
    const key = new Request(url.origin + url.pathname)
    try {
      return await this.networkFirst(event, event.request, key, RR0Worker.PAGES, RR0Worker.MAX_PAGES)
    } catch (offline) {
      const cached = await (await caches.open(RR0Worker.PAGES)).match(key)
      return cached ?? (await (await caches.open(RR0Worker.ASSETS)).match(RR0Worker.OFFLINE)) ?? Response.error()
    }
  }

  /**
   * Keeps what a page already loaded before this worker controlled it.
   *
   * A first visit is made without a worker, so nothing it fetched went through one: the page lists
   * its own resources and hands them over, and they are fetched again (from the browser's HTTP
   * cache, which has just filled) under the same rules as any other file.
   */
  async keep(urls, page) {
    const cache = await caches.open(RR0Worker.ASSETS)
    for (const href of [...urls].slice(0, RR0Worker.MAX_KEPT_AT_ONCE)) {
      const url = this.sameOrigin(href)
      if (!url || url.pathname === "/sw.js" || RR0Worker.SKIPPED.test(url.pathname) || await cache.match(url.href)) {
        continue
      }
      try {
        const response = await fetch(url.href)
        if (RR0Worker.storable(response) && await this.small(response)) {
          await cache.put(url.href, response)
          await this.trim(cache, RR0Worker.MAX_ASSETS)
        }
      } catch (offline) {
        // Gone while it was being kept: nothing to do, it is only a head start.
      }
    }
    // The page itself, under the key a navigation to it will look for.
    const document = this.sameOrigin(page)
    if (document) {
      try {
        const response = await fetch(document.origin + document.pathname)
        if (RR0Worker.storable(response)) {
          const pages = await caches.open(RR0Worker.PAGES)
          await pages.put(document.origin + document.pathname, response)
          await this.trim(pages, RR0Worker.MAX_PAGES)
        }
      } catch (offline) {
        // As above.
      }
    }
  }

  sameOrigin(href) {
    if (!href) {
      return undefined
    }
    try {
      const url = new URL(href, self.location.origin)
      return url.origin === self.location.origin ? url : undefined
    } catch (invalid) {
      return undefined
    }
  }

  async networkFirst(event, request, key, cacheName, maxEntries) {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(key)
    const network = fetch(request).then(async response => {
      if (RR0Worker.storable(response) && await this.small(response)) {
        await cache.put(key, response.clone())
        await this.trim(cache, maxEntries)
      }
      return response
    })
    if (!cached) {
      return network
    }
    event.waitUntil(network.catch(() => undefined))
    const patience = new Promise(resolve => setTimeout(() => resolve(cached), RR0Worker.PATIENCE_MS))
    const answer = network.then(response => response.status >= 500 ? cached : response, () => cached)
    return Promise.race([answer, patience])
  }

  /** A compressed answer carries no content-length, so its size is read off the body rather than assumed. */
  async small(response) {
    const declared = response.headers.get("content-length")
    const size = declared !== null ? Number(declared) : (await response.clone().blob()).size
    return size <= RR0Worker.MAX_BYTES
  }

  /** Oldest first: the cache lists its keys in insertion order, and a re-kept entry goes to the end. */
  async trim(cache, maxEntries) {
    const keys = await cache.keys()
    for (const key of keys.slice(0, Math.max(0, keys.length - maxEntries))) {
      await cache.delete(key)
    }
  }
}

const worker = new RR0Worker()
self.addEventListener("install", event => event.waitUntil(worker.install().then(() => self.skipWaiting())))
self.addEventListener("activate", event => event.waitUntil(worker.activate().then(() => self.clients.claim())))
self.addEventListener("message", event => {
  if (event.data && Array.isArray(event.data.keep)) {
    event.waitUntil(worker.keep(event.data.keep, event.data.page))
  }
})
self.addEventListener("fetch", event => {
  const response = worker.respond(event)
  if (response) {
    event.respondWith(response)
  }
})
