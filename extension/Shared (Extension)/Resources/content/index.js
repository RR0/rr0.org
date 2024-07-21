const str = "Roswell"
const elems = Array.from(document.querySelectorAll("*")).filter(el => el.textContent.indexOf(str) >= 0)
const total = elems.length
browser.runtime.sendMessage(total)
console.log("Found", total, "items containing", str, ":", elems)
