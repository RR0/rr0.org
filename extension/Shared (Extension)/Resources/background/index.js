import { ContentHandler } from "../ContentHandler.js"

if (typeof browser == "undefined") {
  // Chrome does not support the browser namespace yet.
  globalThis.browser = chrome
}

const contentHandler = new ContentHandler()
contentHandler.init().then(rr0data => {
  browser.tabs.onActivated.addListener(async (activeInfo) => {
    console.debug("onActivated", activeInfo)
    const tabId = activeInfo.tabId
    await browser.runtime.sendMessage({ type: "resetItems" })
    for (const datum of rr0data.pages) {
      const getTextMsg = { type: "getText", title: datum.title }
      console.debug("Background sends to tab", tabId, getTextMsg)
      browser.tabs.sendMessage(tabId, getTextMsg).then(response => {
        const count = response.count
        if (count > 0) {
          const textFoundMsg = { type: "addItem", data: datum, count }
          console.debug("Background sending", textFoundMsg)
          browser.runtime.sendMessage(textFoundMsg).then(() => {
            console.debug("Background sent", textFoundMsg)
          })
        } else {
          console.debug("Background not sending since there is no", datum.title)
        }
      })
    }
  })
})
