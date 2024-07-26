import { ContentHandler } from "./ContentHandler.js"

if (typeof browser == "undefined") {
  // Chrome does not support the browser namespace yet.
  globalThis.browser = chrome
}

const contentHandlerProm = ContentHandler.getInstance()
contentHandlerProm.then(contentHandler => {
  browser.tabs.onActivated.addListener(async (activeInfo) => {
    console.debug("background.js", "onActivated", activeInfo)
    await contentHandler.scanOccurrences(activeInfo.tabId)
  })
})
