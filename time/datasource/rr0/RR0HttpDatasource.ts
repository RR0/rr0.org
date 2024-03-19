import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { HttpSource } from "../HttpSource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { RR0Datasource } from "./RR0Datasource"
import { TimeContext } from "../../TimeContext"
import { NamedPlace, RR0CaseSummary } from "./RR0CaseSummary"
import { Place } from "../../../place/Place"
import { Publication, Source } from "../../../source/Source"
import { TimeReplacer } from "../../TimeReplacer"
import { CityService } from "../../../org/country/region/department/city/CityService"
import { Organization } from "../../../org/Organization"

export class RR0HttpDatasource extends RR0Datasource {
  protected readonly http = new HttpSource()

  constructor(readonly baseUrl: string, readonly searchPath: string, protected cityService: CityService) {
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
    const time = itemContext.time
    if (timeEl) {
      url.hash = timeEl.dateTime
      this.getTime(time, timeEl)
      timeEl.remove()
    }
    let place: NamedPlace
    const placeEl = row.querySelector(".plac")
    if (placeEl) {
      place = this.getPlace(itemContext, placeEl)
      const toRemove = ["", " À ", " A ", ", "]
      Array.from(row.childNodes).forEach(childNode => {
        if (childNode.nodeType === 3 && toRemove.includes(childNode.nodeValue)) {
          childNode.remove()
        }
      })
    }
    const sources = this.getSources(row, itemContext)
    const description = this.getDescription(row)
    return {url, place, time, description, sources}
  }

  updateTimeFromStr(time: TimeContext, timeStr: string) {
    const result = TimeReplacer.parseDateTime(timeStr)
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

  protected getSources(row: Element, itemContext: HtmlRR0SsgContext): Source[] {
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
      const pubItems = title.split(",")
      const timeStr = pubItems[pubItems.length - 1].trim()
      const parsedTime = TimeReplacer.parseDateTime(timeStr)
      let time: TimeContext
      let publisher: string
      if (parsedTime) {
        time = new TimeContext({...itemContext.time.options})
        TimeReplacer.setTimeContextFrom(time, parsedTime)
        pubItems.pop()
      }
      publisher = pubItems.splice(1, pubItems.length - 1).map(item => item.trim()).join(", ").trim()
      const publication: Publication = {publisher, time}
      title = pubItems[0]
      const source: Source = {title, id, authors, publication}
      sources.push(source)
    }
    return sources
  }

  protected getTime(time: TimeContext, timeEl: HTMLTimeElement) {
    this.updateTimeFromStr(time, timeEl.dateTime)
  }

  protected getPlace(context: HtmlRR0SsgContext, placeEl: Element): NamedPlace {
    const placeStr = placeEl.textContent
    const placeParsed = RR0HttpDatasource.placeRegex.exec(placeStr)
    let name: string
    let place: Place
    let org: Organization | undefined
    if (placeParsed) {
      const parent = undefined  // TODO: Find region from placeParsed[2]
      org = this.cityService.find(context, placeParsed[1], parent)
      if (org) {
        name = org.messages(context).toTitle(context, org, {parent: true})
        place = org.places[0]
      } else {
        context.debug(`Could not find place named "${placeParsed[1]}"`)
      }
    }
    if (!org) {
      name = placeStr
      place = new Place([])
    }
    placeEl.remove()
    return {name, org, place}
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
