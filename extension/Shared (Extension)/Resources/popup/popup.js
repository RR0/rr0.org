let loading = false

function siteSearchLoad () {
  if (!siteIndex && !loading) {
    loading = true
    fetch("https://rr0.org/search/index.json").then(async (response) => {
      const datalist = document.querySelector("#search-site-values")
      if (response.ok) {
        siteIndex = await response.json()
        for (const page of siteIndex.pages) {
          const option = document.createElement("option")
          option.value = page.title
          datalist.append(option)
        }
      }
      loading = false
    })
  }
}

var siteIndex

function siteSearchChange (e) {
  if (e.inputType === "insertReplacementText" || e.inputType == null) {
    const value = e.target.value.trim()
    const pageIndex = siteIndex.pages.findIndex(page => page.title === value)
    if (pageIndex >= 0) {
      const page = siteIndex.pages[pageIndex]
      chrome.tabs.create({ url: `https://rr0.org/${page.url}` })
    }
  }
}

const search = document.querySelector("#search")
search.onmouseover = siteSearchLoad
const searchInput = document.querySelector("#search-site")
searchInput.oninput = (event) => siteSearchChange(event)

const linksAnchor = document.querySelector("#matching-links")

/**
 *
 * @param {RR0Data} data
 * @param {number} count
 */
function addItem (data, count) {
  const item = document.createElement("li")
  const a = document.createElement("a")
  a.href = data.url
  a.textContent = `${data.title} (${count})`
  a.target = "_blank"
  item.append(a)
  linksAnchor.append(item)
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.debug("Popup receives message", message)
  switch (message.type) {
    case "resetItems":
      linksAnchor.innerHTML = ""
      browser.action.setBadgeText({ text: "" })
      break
    case "addItem":
      addItem(message.data, message.count)
      browser.action.setBadgeText({ text: String(linksAnchor.childElementCount) })
      break
    default:
      console.warn("Popup received unsupported message", message)
  }
})

/* browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0]?.id },
    files: ["src/saveAllImagesToPreview.ts.js"]
  })
})

/*  chrome.storage.local.set({
    images_preview: sources.map((source) => ({
      id: nanoid(),
      src: source
    }))
  })
*/
/*chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "saveAllImagesToPreview") {
    createNewImagesPreview(message.sources)
  }
})
*/
