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
