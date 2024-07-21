if (typeof browser == "undefined") {
  // Chrome does not support the browser namespace yet.
  globalThis.browser = chrome
}

class ContentHandler {
  /**
   * @readonly
   * @type {string}
   */
  #baseUrl = "https://rr0.org"

  /**
   * @readonly
   * @type {string}
   */
  #casesDirsUrl = "casesDirs.json"

  /**
   * @readonly
   * @type {string}
   */
  #peopleDirsUrl = "peopleDirs.json"

  /**
   * @type {string[]}
   */
  #casesFiles

  /**
   * @type {string[]}
   */
  #peopleFiles

  /**
   *
   * @param {URL} url
   * @param {string} suffix
   * @template T
   * @return {Promise<T[]>}
   */
  async fetchArray (url, suffix) {
    const casesJson = await this.fetchJson(url)
    return casesJson.map(dir => dir + suffix)
  }

  /**
   * @param {URL} url
   * @template T
   * @return {Promise<T>}
   */
  async fetchJson (url) {
    const casesResponse = await fetch(url, { headers: { "accept": "application/json" } })
    return await casesResponse.json()
  }

  async init () {
    this.#casesFiles = /** @type {string[]} */ await this.fetchArray(new URL(this.#casesDirsUrl, this.#baseUrl), "/case.json")
    this.#peopleFiles = /** @type {string[]} */ await this.fetchArray(new URL(this.#peopleDirsUrl, this.#baseUrl), "/people.json")
  }

  /**
   * @template T
   * @param {URL} url
   * @param {RequestInit} [init]
   * @return {Promise<T>}
   */
  async archiveFetch (url, init) {
    const archiveUrl = new URL("http://archive.org/wayback/available?url=" + url)
    const archiveInit = { headers: { "content-type": MimeType.json } }
    const archiveJson = await fetch(archiveUrl, archiveInit)
    const closest = archiveJson.archived_snapshots["closest"]
    if (!closest) {
      throw new Error("Link is not archived")
    }
    const archivedUrl = new URL(closest.url)
    const result = await fetch(archivedUrl, init)
    const timestamp = closest.timestamp
    const archiveDate = new Date(
      timestamp.substring(0, 4) + "-" + timestamp.substring(4, 6) + "-" + timestamp.substring(6, 8) + " "
      + timestamp.substring(8, 10) + ":" + timestamp.substring(10, 12) + ":" + timestamp.substring(12, 14))
    return result
  }
}

new ContentHandler().init().then(() => {
  browser.runtime.onMessage.addListener((total) => {
    browser.action.setBadgeText({ text: total + "" })
  })
})

let activeTabId, lastUrl, lastTitle

function getTabInfo (tabId) {
  browser.tabs.get(tabId, (tab) => {
    if (lastUrl !== tab.url || lastTitle !== tab.title)
      console.log(lastUrl = tab.url, lastTitle = tab.title)
  })
}

browser.tabs.onActivated.addListener((activeInfo) => {
  getTabInfo(activeTabId = activeInfo.tabId)
})

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (activeTabId === tabId) {
    getTabInfo(tabId)
  }
})
