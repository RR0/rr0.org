import { HttpFetcher, HttpSourceError, MimeType } from "./HttpSource"

export interface FetchHttpFetcherOptions {
  userAgents: string[]
}

const mozilla = "Mozilla/5.0"

const windowsNT10 = "Windows NT 10.0"

const win64x64 = "Win64; x64"

const appleWebKit = `AppleWebKit/537.36 (KHTML, like Gecko)`

export class FetchHttpFetcher implements HttpFetcher {

  constructor(protected options: FetchHttpFetcherOptions = {
    userAgents: [
      `${mozilla} (${windowsNT10}; ${win64x64}) ${appleWebKit} Chrome/74.0.3729.169 Safari/537.36`,
      `${mozilla} (${windowsNT10}; WOW64) ${appleWebKit} Chrome/72.0.3626.121 Safari/537.36`,
      `${mozilla} (${windowsNT10}; ${win64x64}) ${appleWebKit} Chrome/74.0.3729.157 Safari/537.36`,
      `${mozilla} (${windowsNT10}; ${win64x64}) ${appleWebKit} Chrome/96.0.4664.110 Safari/537.36`,
      `${mozilla} (${windowsNT10}; ${win64x64}) ${appleWebKit} Chrome/96.0.4664.45 Safari/537.36`,
      `${mozilla} (${windowsNT10}; ${win64x64}) ${appleWebKit} Chrome/97.0.4692.71 Safari/537.36`,
      `${mozilla} (Macintosh; Intel Mac OS X 10_15_7) ${appleWebKit} Chrome/126.0.0.0 Safari/537.36`
    ]
  }) {
  }

  static findParam(str: string, separator: string, param: string): string {
    const params = str.split(separator).map(s => {
      let t = s.trim()
      const q = t.indexOf("?")
      if (q) {
        t = t.substring(q + 1)
      }
      return t
    })
    const key = param + "="
    const foundParam = params.find(p => p.startsWith(key))
    return foundParam.substring(key.length)
  }

  randomUA(): string {
    const userAgents = this.options.userAgents
    const randomNumber = Math.floor(Math.random() * userAgents.length)
    return userAgents[randomNumber]
  }

  async fetch<T>(url: URL, init: RequestInit = {}, resOut: Partial<Response> = {}): Promise<T> {
    init.headers = Object.assign({"User-Agent": this.randomUA()}, init.headers)
    console.debug("Fetching", url.toString(), "with", init)
    const response = await fetch(url, init)
    if (response.ok) {
      Object.assign(resOut, {headers: response.headers})
      const accept = init.headers["accept"]
      if (accept) {
        const buffer = await response.arrayBuffer()
        const charset = FetchHttpFetcher.findParam(accept, ";", "charset")
        const decoder = new TextDecoder(charset)
        return decoder.decode(buffer) as T
      } else {
        switch (response.headers.get("content-type")) {
          case MimeType.json:
            return await response.json()
          case MimeType.xls:
          case MimeType.pdf:
            return await response.arrayBuffer() as T
          default:
            return await response.text() as T
        }
      }
    } else {
      throw new HttpSourceError(response.url, response.status, response.statusText)
    }
  }
}
