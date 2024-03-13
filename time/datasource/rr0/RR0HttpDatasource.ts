import { RR0SsgContext } from "../../../RR0SsgContext"
import { HttpSource } from "../HttpSource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { RR0Datasource } from "./RR0Datasource"

export class RR0HttpDatasource extends RR0Datasource {
  protected readonly http = new HttpSource()

  constructor(readonly baseUrl = "https://rr0.org", readonly searchPath = "time") {
    super()
  }

  async getAll(context: RR0SsgContext): Promise<RR0CaseSummary[]> {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    const queryUrl = this.queryUrl(year, month, day)
    const page = await this.http.fetch<string>(queryUrl)
    const doc = new JSDOM(page).window.document.documentElement
    /*const charSetMeta = doc.querySelector("meta[http-equiv='Content-Type']")
    const contentType = charSetMeta.getAttribute("content")
    let charset = findParam(contentType, ";", "charset") as BufferEncoding
    if (charset.startsWith("iso-8859")) {
      charset = "latin1"
    }
    const decoder = new TextDecoder(charset)*/
    const rowEls = doc.querySelectorAll("ul.indexed li")
    return this.getFromRows(context, rowEls)
  }

  getFromRows(context: RR0SsgContext, rowEls: NodeListOf<Element>): RR0CaseSummary[] {
    const rows = Array.from(rowEls)
    const cases: RR0CaseSummary[] = []
    for (const row of rows) {
      if (row.hasChildNodes()) {
        cases.push(this.getFromRow(context, row))
      }
    }
    return cases
  }

  getFromRow(context: RR0SsgContext, row: Element): RR0CaseSummary {
    const caseLink = context.inputFile.name
    const dateFormat = /(?:(\d\d).(\d\d).(\d\d\d\d))?\n?(.+)?/
    const dateFields = dateFormat.exec(fields[1].textContent)
    const itemContext = context.clone()
    const dateTime = itemContext.time
    dateTime.setYear(parseInt(dateFields[3], 10))
    dateTime.setMonth(parseInt(dateFields[2], 10))
    const dayOfMonth = dateFields[1]
    dateTime.setDayOfMonth(dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined)
    const dateTimeRefinement = dateFields[4] ? dateFields[4].trim() : undefined
    const placeStr = fields[2].innerHTML
    const placeRows = placeStr.split("<br>")
    const sightingPlace = placeRows[0]
    const city = placeRows.length > 1 ? context.messages.country.fi.cityName(placeRows[1]) : undefined
    const url = new URL(caseLink.href, this.baseUrl)
    const caseNumber = parseInt(HttpSource.findParam(url.href, "&", "u"), 10)
    const classification = fields[3].textContent
    return {
      caseNumber,
      url,
      sightingPlace,
      city,
      dateTime,
      dateTimeRefinement,
      classification
    }
  }

  protected queryUrl(year: number, month: number, day: number): string {
    const searchUrl = UrlUtil.join(this.baseUrl, this.searchPath)
    let timeStr = String(year).padStart(4, "0").split("").join("/")
    if (month) {
      timeStr = UrlUtil.join(timeStr, String(month).padStart(2, "0"))
      if (day) {
        timeStr = UrlUtil.join(timeStr, String(day).padStart(2, "0"))
      }
    }
    return UrlUtil.join(searchUrl, timeStr)
  }
}
