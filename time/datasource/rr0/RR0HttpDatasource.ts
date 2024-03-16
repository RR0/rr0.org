import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { HttpSource } from "../HttpSource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { RR0Datasource } from "./RR0Datasource"
import { TimeContext } from "../../TimeContext"
import { NamedPlace, RR0CaseSummary } from "./RR0CaseSummary"
import { Place } from "../../../place/Place"
import { Source } from "../../../source/Source"
import { TimeReplacer } from "../../TimeReplacer"
import { OnlineSource } from "../../../source/OnlineSource"
import { TimeTextBuilder } from "../../TimeTextBuilder"
import { StringUtil } from "../../../util/string/StringUtil"

export class RR0HttpDatasource extends RR0Datasource {
  protected readonly http = new HttpSource()

  constructor(readonly baseUrl = "https://rr0.org", readonly searchPath = "time") {
    super()
  }

  async getAll(context: HtmlRR0SsgContext): Promise<RR0CaseSummary[]> {
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
    const rows = Array.from(rowEls)
    return this.getFromRows(context, rows)
  }

  getFromRows(context: HtmlRR0SsgContext, rows: Element[]): RR0CaseSummary[] {
    const cases: RR0CaseSummary[] = []
    for (const row of rows) {
      if (row.hasChildNodes()) {
        cases.push(this.getFromRow(context, row))
      }
    }
    return cases
  }

  getFromRow(context: HtmlRR0SsgContext, r: Element): RR0CaseSummary {
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
    const sources = this.getSources(itemContext, row)
    const description = this.getDescription(row)
    return {url, place: namedPlace, time: timeContext, description, sources}
  }

  protected getSources(context: HtmlRR0SsgContext, row: Element): Source[] {
    const sources: Source[] = []
    const sourceEls = row.querySelectorAll(".source-id")
    for (const sourceEl of sourceEls) {
      const id = sourceEl.childNodes[0].textContent
      const sourceContent = sourceEl.querySelector(".source-contents")
      let title = this.getDescription(sourceContent)
      const authorEnd = title.indexOf(":")
      const authors = title.substring(0, authorEnd).split("&").map(s => s.trim())
      title = title.substring(authorEnd + 1).trim()
      sourceEl.remove()
      const source: Source = {title, id, authors}
      sources.push(source)
    }
    const title = StringUtil.capitalizeFirstLetter(context.inputFile.title || TimeTextBuilder.build(context))
    const url = new URL(context.inputFile.name, this.baseUrl)
    url.hash = context.time.toString()
    const rr0Source: OnlineSource = {
      url,
      previousSourceRefs: sources.map(source => source.id),
      authors: this.authors,
      title,
      publication: {
        publisher: this.copyright,
        time: ""
      }
    }
    sources.push(rr0Source)
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
    const place = new Place([])
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
