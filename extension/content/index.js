const baseUrl = "https://rr0.org"
const casesDirsUrl = "casesDirs.json"
const peopleDirsUrl = "peopleDirs.json"

/**
 *
 * @param {URL} url
 * @param {string} suffix
 * @template T
 * @return {Promise<T[]>}
 */
async function fetchArray (url, suffix) {
  const casesJson = await this.fetchJson(url)
  return casesJson.map(dir => dir + suffix)
}

/**
 * @param {URL} url
 * @template T
 * @return {Promise<T>}
 */
async function fetchJson (url) {
  const casesResponse = await fetch(url, { headers: { "accept": "application/json" } })
  return await casesResponse.json()
}

const casesFiles = /** @type {string[]} */ await fetchArray(new URL(casesDirsUrl, baseUrl), "/case.json")
const peopleFiles = /** @type {string[]} */ await fetchArray(new URL(peopleDirsUrl, baseUrl), "/people.json")

/**
 * @template T
 * @param {URL} url
 * @param {RequestInit} [init]
 * @param {Partial<Response>} [resOut]
 * @param {HttpSourceError} [error]
 * @return {Promise<T>}
 */
async function archiveFetch (url, init, resOut, error) {
  const archiveUrl = new URL("http://archive.org/wayback/available?url=" + url)
  const archiveInit = { headers: { "content-type": MimeType.json } }
  const archiveJson = await this.fetcher.fetch(archiveUrl, archiveInit, resOut)
  const closest = archiveJson.archived_snapshots["closest"]
  if (!closest) {
    throw error
  }
  const archivedUrl = new URL(closest.url)
  const result = await fetch(archivedUrl, init)
  const timestamp = closest.timestamp
  const archiveDate = new Date(
    timestamp.substring(0, 4) + "-" + timestamp.substring(4, 6) + "-" + timestamp.substring(6, 8) + " "
    + timestamp.substring(8, 10) + ":" + timestamp.substring(10, 12) + ":" + timestamp.substring(12, 14))
  const headers = new Headers(resOut.headers)
  headers.set("last-modified", archiveDate.toString())
  headers.set("host", url.hostname)
  Object.assign(resOut, { url: archivedUrl, headers })
  return result
}

/*document.querySelectorAll('a').forEach(async(anchor) => {
  try {
    const url = new URL(anchor.href)
    if (!["google.com", "google.fr"].includes(url.hostname)) {
      const response = await fetch(url.href, { method: "HEAD", mode: "no-cors" })
      if (response.status === 404) {
        console.warn(anchor.href, "is a broken link")
      }
    }
  } catch (e) {
    console.warn(e.message)
  }
})*/
