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

// Installed as an app, the site has no browser bar, hence no sign that a clicked link is loading, and on a phone
// (iOS above all) no back and forward buttons either: provide them. In a browser tab, the browser does it, so nothing
// is added there; nor are the buttons where the app window has its own (display-mode: minimal-ui), except on iOS
// (navigator.standalone), whose home-screen apps show no button at all, whatever display mode they report.
const appMode = mode => matchMedia(`(display-mode: ${mode})`).matches
if (appMode("standalone") || appMode("fullscreen") || appMode("minimal-ui") || navigator.standalone) {
  const bar = document.createElement("div")
  bar.className = "loading-bar"
  bar.setAttribute("aria-hidden", "true")
  let giveUp
  const hide = () => {
    clearTimeout(giveUp)
    bar.remove()
    sessionStorage.removeItem("rr0-loading")
  }
  const show = () => {
    document.documentElement.append(bar)
    // The next page completes the bar: a page that comes quickly still shows that it came.
    sessionStorage.setItem("rr0-loading", String(Date.now()))
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
  addEventListener("pageshow", event => event.persisted && hide())

  const leftAt = Number(sessionStorage.getItem("rr0-loading"))
  if (leftAt && Date.now() - leftAt < 20000) {
    sessionStorage.removeItem("rr0-loading")
    const arriving = document.createElement("div")
    arriving.className = "loading-bar arriving"
    arriving.setAttribute("aria-hidden", "true")
    document.documentElement.append(arriving)
    // Completed once the page has been drawn with it: done before the first frame, there would be nothing to see.
    addEventListener("load", () => requestAnimationFrame(() => requestAnimationFrame(() => {
      arriving.classList.add("done")
      setTimeout(() => arriving.remove(), 1500)
    })))
  }

  if (!appMode("minimal-ui") || navigator.standalone) {
    addEventListener("DOMContentLoaded", () => {
      const list = document.querySelector("#main-nav > ul")
      if (!list) {
        return
      }
      const item = document.createElement("li")
      item.className = "history"
      const button = (label, symbol, go) => {
        const element = document.createElement("button")
        element.type = "button"
        element.title = label
        element.setAttribute("aria-label", label)
        element.textContent = symbol
        element.addEventListener("click", go)
        return element
      }
      const back = button("Page précédente", "‹", () => history.back())
      const forward = button("Page suivante", "›", () => history.forward())
      item.append(back, forward)
      list.prepend(item)
      // Where the browser says whether there is somewhere to go, a button that would do nothing is shown disabled.
      if ("navigation" in window && "canGoBack" in navigation) {
        const update = () => {
          back.disabled = !navigation.canGoBack
          forward.disabled = !navigation.canGoForward
        }
        update()
        navigation.addEventListener("currententrychange", update)
      }
    })
  }
}
