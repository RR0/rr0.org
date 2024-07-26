class RR0Data {
  /**
   * @type string
   */
  title

  /**
   * @type string
   */
  url
}

export class ContentHandler {
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
   * @type ContentHandler
   */
  static instance

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

  /**
   * @param {string} caseUrl
   * @return Promise<RR0Data>
   */
  async fetchCase (caseUrl) {
    /** @type RR0Data */
    const rr0Case = await this.fetchJson(new URL(caseUrl, this.#baseUrl))
    const caseFile = "/case.json"
    rr0Case.url = new URL(caseUrl.replace(caseFile, "/index.html"), this.#baseUrl)
    if (!navigator.language.startsWith("fr") || !rr0Case.title) {
      rr0Case.type = "case"
      let titleFromUrl = caseUrl.substring(0, caseUrl.length - caseFile.length)
      titleFromUrl = titleFromUrl.substring(titleFromUrl.lastIndexOf("/") + 1)
      rr0Case.title = titleFromUrl.replaceAll(/([a-z0-9])([A-Z0-9])/g, "$1 $2").trim()
    }
    return rr0Case
  }

  /**
   * @param {string} peopleUrl
   * @return Promise<RR0Data>
   */
  async fetchPeople (peopleUrl) {
    /** @type RR0Data */
    let people
    try {
      /** @type RR0Data */
      people = await this.fetchJson(new URL(peopleUrl, this.#baseUrl))
    } catch (e) {
      people = {}
    }
    const peopleFile = "/people.json"
    if (!people.title) {
      people.type = "people"
      let titleFromUrl = peopleUrl.substring(0, peopleUrl.length - peopleFile.length)
      titleFromUrl = titleFromUrl.substring(titleFromUrl.lastIndexOf("/") + 1)
      people.title = titleFromUrl.replaceAll(/([a-z0-9])([A-Z0-9])/g, "$1 $2").trim()
    }
    people.url = new URL(peopleUrl.replace(peopleFile, "/index.html"), this.#baseUrl)
    return people
  }

  /**
   *
   * @type {RR0Data[]}
   */
  #rr0Data = []
  /**
   * @type {Map<RR0Data, number>}
   */
  #occurrences = new Map()

  /**
   * @return {Map<RR0Data, number>}
   */
  get occurences () {
    return this.#occurrences
  }

  async init () {
    // await this.readCasesData()
    // await this.readPeopleData()
    this.#rr0Data = await this.fetchJson(new URL("search/index.json", this.#baseUrl))
    console.debug(this.#rr0Data)
  }

  async readPeopleData () {
    const peopleFiles = /** @type {string[]} */ await this.fetchArray(new URL(this.#peopleDirsUrl, this.#baseUrl), "/people.json")
    for (const peopleHref of peopleFiles) {
      const people = await this.fetchPeople(peopleHref)
      this.#rr0Data.push(people)
    }
  }

  async readCasesData () {
    const casesFiles = /** @type {string[]} */ await this.fetchArray(new URL(this.#casesDirsUrl, this.#baseUrl), "/case.json")
    for (const casesHref of casesFiles) {
      const rr0Case = await this.fetchCase(casesHref)
      this.#rr0Data.push(rr0Case)
    }
  }

  get data () {
    return this.#rr0Data
  }

  /**
   * @return {Promise<ContentHandler>}
   */
  static async getInstance () {
    if (!ContentHandler.instance) {
      ContentHandler.instance = new ContentHandler()
      await ContentHandler.instance.init()
    }
    return ContentHandler.instance
  }

  #logDebug (...msg) {
    return console.debug(this.constructor.name, ...msg)
  }

  /**
   *
   * @param {number} tabId
   * @param {string} title
   * @return {Promise<number>} The count of the title.
   */
  async getTextCount (tabId, title) {
    // this.#logDebug("getTextCount", tabId, title)
    const getTextMsg = { type: "getText", title }
    console.debug("sends to tab", tabId, getTextMsg)
    //  const response = await browser.tabs.sendMessage(tabId, getTextMsg)
    return response.count
  }

  /**
   *
   * @param {number} tabId
   * @return {Map<RR0Data, number>}
   */
  async scanOccurrences (tabId) {
    this.#logDebug("scanOccurrences", tabId)
    let total = 0
    this.#occurrences.clear()
    for (const datum of this.#rr0Data.pages) {
      const title = datum.title
      const titleCount = await this.getTextCount(tabId, title)
      this.#occurrences.set(datum, titleCount)
      total += titleCount
    }
    browser.action.setBadgeText({ text: total ? String(total) : "" })
    return this.#occurrences
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
    const archiveDate = new Date(timestamp.substring(0, 4) + "-" + timestamp.substring(4, 6) + "-" + timestamp.substring(6, 8) + " " + timestamp.substring(8, 10) + ":" + timestamp.substring(10, 12) + ":" + timestamp.substring(12, 14))
    return result
  }
}
