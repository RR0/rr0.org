import { RR0SsgContext } from "../../../RR0SsgContext"
import { HttpSource } from "../HttpSource"
import { JSDOM } from "jsdom"
import { SceauDatasource } from "./SceauDatasource"
import { SceauCaseSummary } from "./SceauCaseSummary"
import path from "path"

export class SceauHttpDatasource extends SceauDatasource {

  protected readonly http = new HttpSource()

  constructor(readonly baseUrl: URL, protected searchPath = "fonds") {
    super()
  }

  getFromRows(context: RR0SsgContext, rows: Element[], fields: string[]): SceauCaseSummary[] {
    const cases: SceauCaseSummary[] = []
    for (const row of rows) {
      if (row.hasChildNodes()) {
        cases.push(this.getFromRow(context, row, fields))
      }
    }
    return cases
  }

  protected queryUrl(context: RR0SsgContext, fondPath: string): URL {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    return new URL(path.join(this.searchPath, fondPath), this.baseUrl)
  }

  protected async readCases(context: RR0SsgContext): Promise<SceauCaseSummary[]> {
    let allCases = []
    for (const fetchedPage of this.pages) {
      const searchUrl = this.queryUrl(context, fetchedPage.path)
      const page = await this.http.fetch<string>(searchUrl)
      const doc = new JSDOM(page).window.document.documentElement
      const rowEls = doc.querySelectorAll("tr")
      const rows = Array.from(rowEls)
      const header = rows.shift()
      const headings = Array.from(header.querySelectorAll("td")).map(header => header.textContent)
      const fields = []
      for (const heading of headings) {
        const entries = Object.entries(fetchedPage.mapping)
        for (const [field, label] of entries) {
          if (label === heading) {
            fields.push(field)
            break
          }
        }
      }
      const fondCases = this.getFromRows(context, rows, fields)
      allCases = allCases.concat(fondCases)
    }
    return allCases
  }

  protected getFromRow(context: RR0SsgContext, row: Element, fields: string[]): SceauCaseSummary {
    const values = row.querySelectorAll("td")
    const obj = {}
    for (let i = 0; i < values.length; i++) {
      obj[fields[i]] = values[i].textContent
    }
    return obj as SceauCaseSummary
  }
}
