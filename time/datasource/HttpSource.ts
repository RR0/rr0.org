export class MimeType {
  static readonly csv: string = "text/csv"
  static readonly json: string = "application/json"
  static readonly txt: string = "text/plain"
  static readonly xls: string = "application/vnd.ms-excel"
}

/**
 * A source for cases that can be fetched online.
 */
export class HttpSource {

  constructor(
    protected userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64)  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
    ]
  ) {
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

  randomUA() {
    const randomNumber = Math.floor(Math.random() * this.userAgents.length)
    return this.userAgents[randomNumber]
  }

  async fetch<T>(url: string, init: RequestInit = {}): Promise<T> {
    init.headers = Object.assign({"User-Agent": this.randomUA()}, init.headers)
    const response = await fetch(url, init)
    if (response.ok) {
      const accept = init.headers["accept"]
      if (accept) {
        const buffer = await response.arrayBuffer()
        const charset = HttpSource.findParam(accept, ";", "charset")
        const decoder = new TextDecoder(charset)
        return decoder.decode(buffer) as T
      } else {
        switch (response.headers.get("content-type")) {
          case MimeType.json:
            return await response.json()
          case MimeType.xls:
            return await response.arrayBuffer() as T
          default:
            return await response.text() as T
        }
      }
    } else {
      throw Error(response.statusText)
    }
  }

  async submitForm<T>(url: string, obj: object, headers = {}): Promise<T> {
    const formData = new FormData()
    Object.entries(obj).forEach(entry => formData.append(entry[0], encodeURIComponent(entry[1])))
    const init: RequestInit = {method: "POST", headers, body: formData}
    return await this.fetch(url, init)
  }
}
