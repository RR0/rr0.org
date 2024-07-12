import { HttpFetcher, HttpSourceError, MimeType } from "./HttpSource"
import { FetchHttpFetcher } from "./FetchHttpFetcher"

export interface ArchiveSnapshot {
  available: boolean
  url: string
  /**
   * "YYYYMMDDMMHHSS"
   */
  timestamp: string
  status: number
}

export interface ArchiveHttpFetcherResponse {
  archived_snapshots: {
    [name: string]: ArchiveSnapshot
  }
}

export class ArchiveHttpFetcher implements HttpFetcher {
  protected fetcher: FetchHttpFetcher

  constructor() {
    this.fetcher = new FetchHttpFetcher()
  }

  async fetch<T>(url: URL, init?: RequestInit, resOut?: Partial<Response>,
                 error?: HttpSourceError): Promise<T> {
    const archiveUrl = new URL("http://archive.org/wayback/available?url=" + url)
    const archiveInit = {headers: {"content-type": MimeType.json}}
    const archiveJson: ArchiveHttpFetcherResponse = await this.fetcher.fetch(archiveUrl, archiveInit, resOut)
    const closest = archiveJson.archived_snapshots["closest"]
    if (!closest) {
      throw error
    }
    const archivedUrl = new URL(closest.url)
    const result = await this.fetcher.fetch<T>(archivedUrl, init, resOut)
    const timestamp = closest.timestamp
    const archiveDate = new Date(
      timestamp.substring(0, 4) + "-" + timestamp.substring(4, 6) + "-" + timestamp.substring(6, 8) + " "
      + timestamp.substring(8, 10) + ":" + timestamp.substring(10, 12) + ":" + timestamp.substring(12, 14))
    const headers = new Headers(resOut.headers)
    headers.set("last-modified", archiveDate.toString())
    headers.set("host", url.hostname)
    Object.assign(resOut, {url: archivedUrl, headers})
    return result
  }
}
