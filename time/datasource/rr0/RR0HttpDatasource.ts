import { RR0SsgContext } from "../../../RR0SsgContext"
import { HttpSource } from "../HttpSource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { RR0Datasource } from "./RR0Datasource"
import { TimeContext } from "../../TimeContext"
import { NamedPlace, RR0CaseSummary } from "./RR0CaseSummary"
import { Place } from "../../../place/Place"
import { Publication, Source } from "../../../source/Source"
import { TimeReplacer } from "../../TimeReplacer"

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

  getFromRow(context: RR0SsgContext, r: Element): RR0CaseSummary {
    const row = r.cloneNode(true) as Element
    const caseLink = context.inputFile.name
    const url = new URL(caseLink, this.baseUrl)
    const timeEl = row.querySelector("time") as HTMLTimeElement
    const itemContext = context.clone()
    let timeContext = itemContext.time
    if (timeEl) {
      url.hash = timeEl.dateTime
      this.getTime(timeContext, timeEl)
      timeEl.remove()
    }
    let namedPlace: NamedPlace
    const placeEl = row.querySelector(".plac")
    if (placeEl) {
      namedPlace = this.getPlace(placeEl)
      const toRemove = ["", " À ", " A ", ", "]
      Array.from(row.childNodes).forEach(childNode => {
        if (childNode.nodeType === 3 && toRemove.includes(childNode.nodeValue)) {
          childNode.remove()
        }
      })
    }
    const sources = this.getSources(row)
    const description = this.getDescription(row)
    return {url, place: namedPlace, time: timeContext, description, sources}
  }

  protected getSources(row: Element): Source[] {
    const sources: Source[] = []
    const sourceIds = row.querySelectorAll(".source-id")
    for (const sourceId of sourceIds) {
      const sourceContent = sourceId.querySelector(".source-contents")
      const title = this.getDescription(sourceContent)
      sourceId.remove()
      const publication: Publication = {
        publisher: this.copyright,
        time: ""
      }
      sources.push(new Source(title, this.authors, publication))
    }
    return sources
  }

  protected getTime(time: TimeContext, timeEl: HTMLTimeElement) {
    const result = TimeReplacer.parseDateTime(timeEl.dateTime)
    if (result) {
      const {yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone} = result
      time.setYear(parseInt(yearStr, 10))
      if (monthStr) {
        time.setMonth(parseInt(monthStr, 10))
      }
      if (dayOfMonthStr) {
        time.setDayOfMonth(parseInt(dayOfMonthStr, 10))
      }
      if (hour) {
        time.setHour(parseInt(hour, 10))
      }
      if (minutes) {
        time.setMinutes(parseInt(minutes, 10))
      }
      if (timeZone) {
        time.setTimeZone(timeZone)
      }
    }
  }

  protected getPlace(placeEl: Element): NamedPlace {
    const name = placeEl.textContent
    const place = new Place()
    placeEl.remove()
    return {name, place}
  }

  protected getDescription(el: Element): string {
    const notes = el.querySelectorAll(".note-id")
    for (const note of notes) {
      const noteContents = note.querySelector(".note-contents")
      note.replaceWith(` (${noteContents.textContent})`)
    }
    return el.textContent.trim().replaceAll("\n", "").replace(/\s{2,}/g, " ").replaceAll(" .", ".")
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
