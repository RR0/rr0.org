const setTemporaryViewTransitionNames = async ($el, name, vtPromise) => {
  $el.style.viewTransitionName = name // Set view-transition-name values on the clicked link
  await vtPromise
  $el.style.viewTransitionName = ""   // Clean up after the page got replaced
}
// Old page logic
window.addEventListener("pageswap", async (e) => {
  if (e.viewTransition) {
    setTemporaryViewTransitionNames(document.activeElement, "title", e.viewTransition.finished)
  }
})
// New page logic
window.addEventListener("pagereveal", async (e) => {
  if (e.viewTransition) {
    setTemporaryViewTransitionNames(document.querySelector(`#main-header h1`), "title", e.viewTransition.ready)
  }
})

// Offline use: registers the worker once the page has loaded, so that it never competes with the page itself.
// On a first visit this page was made without a worker, so none of what it loaded went through one: hand it the
// list (and again a few seconds later, for what the page loads on its own) so the page just read can be reread offline.
if ("serviceWorker" in navigator) {
  addEventListener("load", () => {
    const uncontrolled = !navigator.serviceWorker.controller
    navigator.serviceWorker.register("/sw.js").then(() => navigator.serviceWorker.ready).then(registration => {
      if (!uncontrolled || !registration.active) {
        return
      }
      const hand = () => registration.active.postMessage({
        keep: performance.getEntriesByType("resource").map(entry => entry.name).filter(name => name.startsWith(location.origin + "/")),
        page: location.href
      })
      hand()
      setTimeout(hand, 8000)
    }).catch(() => {})
  })
}

// Installed as an app, the site has no browser bar, hence no sign that a clicked link is loading: show one. In a
// browser tab, the browser's own indicator does it, so nothing is added there.
if (matchMedia("(display-mode: standalone), (display-mode: minimal-ui), (display-mode: fullscreen)").matches) {
  const bar = document.createElement("div")
  bar.className = "loading-bar"
  bar.setAttribute("aria-hidden", "true")
  let giveUp
  const hide = () => {
    clearTimeout(giveUp)
    bar.remove()
  }
  const show = () => {
    document.body.append(bar)
    giveUp = setTimeout(hide, 20000)  // A navigation the browser dropped (a download, a 204) never unloads the page.
  }
  if ("navigation" in window) {
    navigation.addEventListener("navigate", event => {
      if (!event.destination.sameDocument && !event.downloadRequest && event.navigationType !== "reload") {
        show()
      }
    })
  } else {
    addEventListener("click", event => {
      const link = event.target.closest?.("a[href]")
      const url = link && new URL(link.href, location.href)
      if (url && !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey
        && !event.altKey && !link.target && !link.hasAttribute("download") && url.protocol.startsWith("http")
        && !(url.pathname === location.pathname && url.search === location.search && url.hash)) {
        show()
      }
    })
  }
  // Back from the back/forward cache, the page comes as it was left: with its bar.
  addEventListener("pageshow", hide)
}
