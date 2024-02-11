import { ChronologySource } from "./ChronologySource"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"

export class MimeType {
  /**
   * @readonly
   * @type {string}
   */
  static csv = "text/csv"

  /**
   * @readonly
   * @type {string}
   */
  static json = "application/json"

  /**
   * @readonly
   * @type {string}
   */
  static txt = "text/plain"

  /**
   * @readonly
   * @type {string}
   */
  static xls = "application/vnd.ms-excel"
}

export abstract class HttpChrolologySource extends ChronologySource {

  protected constructor(author: string, copyright: string) {
    super(author, copyright)
  }

  static findParam(str: string, separator: string, param: string): string {
    const params = str.split(separator).map(s => s.trim())
    const key = param + "="
    const foundParam = params.find(p => p.startsWith(key))
    return foundParam.substring(key.length)
  }

  abstract get(context: HtmlRR0SsgContext): Promise<HTMLLIElement[]>;

  protected async submitForm<T>(url: string, obj: object, headers = {}): Promise<T> {
    const formData = new FormData()
    Object.entries(obj).forEach(entry => formData.append(entry[0], encodeURIComponent(entry[1])))
    const init: RequestInit = {method: "POST", headers, body: formData}
    const response = await fetch(url, init)
    if (response.ok) {
      const accept = headers["accept"]
      if (accept) {
        const buffer = await response.arrayBuffer()
        const charset = HttpChrolologySource.findParam(accept, ";", "charset")
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
}
