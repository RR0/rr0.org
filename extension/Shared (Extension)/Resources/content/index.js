const containers = ["HTML", "BODY", "NAV", "UL", "OL", "SECTION", "ARTICLE", "ASIDE", "HEADER", "FOOTER"]

const textToElems = new Map()

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "getText":
      const title = message.title
      const textElems = Array.from(document.querySelectorAll("*")).filter(el => !containers.includes(el.tagName))
      const matchingElems = textElems.filter(el => el.textContent.indexOf(title) >= 0)
      let elems = textToElems.get(title)
      if (!elems) {
        elems = []
        textToElems.set(title, elems)
      }
      const count = matchingElems.length
      console.debug("Found", count, "items containing", title, ":", matchingElems)
      sendResponse({ count })
      break
  }
})
