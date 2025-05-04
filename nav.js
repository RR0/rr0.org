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
