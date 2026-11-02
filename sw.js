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
    "/", "/offline.html", "/manifest.json", "/favicon.ico", "/apple-touch-icon.png", "/images/rr0-logo-512.jpg",
    "/nav.js",
    "/rr0.css", "/map.css", "/diagram.css", "/print.css", "/figure.css", "/section.css", "/table.css",
    "/nav.css", "/math.css", "/link.css", "/quote.css", "/footer.css", "/index.css",
    "/search/SearchComponent.mjs", "/search/InputSearchComponent.mjs", "/search/search.css", "/search/index.json",
    "/time/DualRangeComponent.mjs", "/tag/TagsComponent.mjs"
  ]

  /** What the installation itself fetches: the launch screen's logo and the page shown offline. */
  static CORE = ["/offline.html", "/images/rr0-logo-512.jpg"]

  /** Pages (HTML documents), kept by origin and path. */
  static PAGES = "rr0-pages"

  /** Everything a page is made of: styles, scripts, images, data. */
  static ASSETS = "rr0-assets"

  /** What to show offline for a page that was never opened. */
  static OFFLINE = "/offline.html"

  /** The logo the launch screen shows (RR0-Logo.png made 512 px wide); in the trunk, so that it is there at once. */
  static LAUNCH_LOGO = "/images/rr0-logo-512.jpg"

  /**
   * What an installed app shows the moment it is opened, before the page it opens on: without it, the phone
   * shows a blank screen while that page and its style sheets arrive (2 to 3 s on an iPhone). It is written
   * here, with its style inline, so that it needs nothing from the network; it then goes on to the page, and
   * the browser keeps it on screen until that page can be drawn.
   */
  static launchPage(logo) {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta content="initial-scale=1, width=device-width" name="viewport">
  <title>RR0</title>
  <style>
    /* The logo's own ground and letters, so that it does not sit in a box. */
    html { background: #ecedf1; color: #2b3a74 }
    body { margin: 0; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem }
    img { width: min(80vw, 24rem); height: auto }
    .spinner { width: 2rem; height: 2rem; border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: turn 1s linear infinite }
    @keyframes turn { to { transform: rotate(1turn) } }
    @media (prefers-reduced-motion: reduce) { .spinner { animation-duration: 4s } }
  </style>
</head>
<body>
<img alt="RR0" id="logo" src="${logo}">
<div aria-label="Chargement" class="spinner" role="progressbar"></div>
<script>
  const url = new URL(location.href)
  url.searchParams.delete("source")
  // Gone on only once the logo is on screen: going at once, the phone left this page before drawing it.
  const go = () => location.replace(url.pathname + url.search + url.hash)
  document.getElementById("logo").decode().then(go, go)
</script>
</body>
</html>`
  }

  /**
   * The launch screen, its logo written into it from the cache, where the installation put it: asked to
   * the network, it came too late to be seen.
   */
  async launch() {
    const cached = await (await caches.open(RR0Worker.ASSETS)).match(RR0Worker.LAUNCH_LOGO)
    const logo = cached ? await RR0Worker.dataUrl(cached) : RR0Worker.LAUNCH_LOGO
    return new Response(RR0Worker.launchPage(logo), {headers: {"Content-Type": "text/html; charset=utf-8"}})
  }

  static async dataUrl(response) {
    const bytes = new Uint8Array(await response.arrayBuffer())
    let binary = ""
    for (let i = 0; i < bytes.length; i += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
    }
    return `data:${response.headers.get("content-type") ?? "image/png"};base64,${btoa(binary)}`
  }

  /** How long a cached copy waits for a slow network before it is served instead. */
  static PATIENCE_MS = 5000

  static MAX_PAGES = 600

  static MAX_ASSETS = 2500

  /** A file above this size is not kept: one scan or one PDF is not worth the quota. The search index
   * (1.2 MB) is under it, and is also in the trunk. */
  static MAX_BYTES = 2 * 1024 * 1024

  static MAX_KEPT_AT_ONCE = 300

  /** How many writes into a cache between two trims: a cache may overflow its cap by this much. */
  static TRIM_EVERY = 25

  /** Writes per cache since the worker started, to trim every TRIM_EVERY of them. */
  writes = {}

  /** Documents and media: big, rarely re-read, and often served in ranges. */
  static SKIPPED = /\.(pdf|zip|mp3|mp4|ogg|wav|webm|mov|avi|doc|docx|ppt|pptx|xls|xlsx|epub|bin|gz)$/i

  /** A response worth keeping: complete, from here, and not the answer to a redirect (a redirected
   * response given back for a navigation is an error in every browser). */
  static storable(response) {
    return response.ok && response.status === 200 && response.type === "basic" && !response.redirected
  }

  /**
   * Only what the launch screen and an unvisited page need offline: a few dozen KB. The rest of the
   * trunk comes afterwards (completeTrunk). Fetching it all here kept an iPhone on the old worker: an
   * installation of several MB is cut short each time the app is closed, and never ends.
   */
  async install() {
    await this.precache(RR0Worker.CORE, true)
  }

  /** The rest of the trunk, once per worker's life, while the reader browses; what it already holds is skipped. */
  completeTrunk() {
    this.trunk ??= this.precache(RR0Worker.PRECACHE, false).catch(() => undefined)
    return this.trunk
  }

  /** Individually: one missing file must not keep the worker from installing. */
  async precache(paths, refresh) {
    const cache = await caches.open(RR0Worker.ASSETS)
    await Promise.allSettled(paths.map(async path => {
      if (!refresh && await cache.match(path)) {
        return
      }
      // "no-cache" revalidates what the browser holds instead of downloading it again.
      const response = await fetch(new Request(new URL(path, self.location.origin).href, {cache: refresh ? "reload" : "no-cache"}))
      if (RR0Worker.storable(response)) {
        await cache.put(path, response)
      }
    }))
  }

  async activate() {
    // The page request leaves while the worker is still starting, instead of waiting for it.
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable()
    }
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
      // The manifest's start and shortcut URLs carry source=pwa: the app is being opened.
      if (url.searchParams.get("source") === "pwa") {
        return this.launch()
      }
      return this.navigation(event, url)
    }
    return this.networkFirst(event, fetch(request), request, RR0Worker.ASSETS, RR0Worker.MAX_ASSETS)
  }

  /** A page is kept under its path alone: `/search?q=…` and `/page.html#part` are the same document. */
  async navigation(event, url) {
    const key = new Request(url.origin + url.pathname)
    try {
      const source = Promise.resolve(event.preloadResponse).then(preloaded => preloaded ?? fetch(event.request))
      return await this.networkFirst(event, source, key, RR0Worker.PAGES, RR0Worker.MAX_PAGES)
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
          await this.trimSometimes(cache, RR0Worker.ASSETS, RR0Worker.MAX_ASSETS)
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
          await this.trimSometimes(pages, RR0Worker.PAGES, RR0Worker.MAX_PAGES)
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

  /**
   * The network's response is handed to the page as soon as its headers arrive, so that the page streams in
   * as it would without a worker; keeping a copy happens afterwards, off the page's path. Reading the cache
   * before the network answers, or keeping the copy before answering, held every page until it was entirely
   * downloaded and written, and queued the style sheets behind one another (1 to 2 s per click once the
   * caches had filled).
   *
   * @param source The network response, already requested (a navigation preload, or a fetch).
   */
  networkFirst(event, source, key, cacheName, maxEntries) {
    let copy
    const network = source.then(response => {
      copy = RR0Worker.storable(response) ? response.clone() : undefined
      return response
    })
    event.waitUntil(network.then(() => copy && this.store(cacheName, key, copy, maxEntries)).catch(() => undefined))
    const cached = async () => (await caches.open(cacheName)).match(key)
    const answer = network.then(
      async response => response.status >= 500 ? (await cached()) ?? response : response,
      async error => (await cached()) ?? Promise.reject(error)
    )
    const patience = new Promise(resolve => setTimeout(() => cached().then(found => found && resolve(found)), RR0Worker.PATIENCE_MS))
    return Promise.race([answer, patience])
  }

  async store(cacheName, key, response, maxEntries) {
    if (await this.small(response)) {
      const cache = await caches.open(cacheName)
      await cache.put(key, response)
      await this.trimSometimes(cache, cacheName, maxEntries)
    }
  }

  /** Listing a cache of thousands of entries is costly: it is trimmed every few writes, not after each one. */
  async trimSometimes(cache, cacheName, maxEntries) {
    this.writes[cacheName] = (this.writes[cacheName] ?? 0) + 1
    if (this.writes[cacheName] % RR0Worker.TRIM_EVERY === 1) {
      await this.trim(cache, maxEntries)
    }
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
  if (event.request.mode === "navigate") {
    event.waitUntil(worker.completeTrunk())
  }
  const response = worker.respond(event)
  if (response) {
    event.respondWith(response)
  }
})
