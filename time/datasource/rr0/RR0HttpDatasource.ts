import { HtmlRR0SsgContext } from "../../../RR0SsgContext.js"
import { HttpSource } from "../HttpSource.js"
import { UrlUtil } from "../../../util/url/UrlUtil.js"
import { RR0Datasource } from "./RR0Datasource.js"
import { TimeContext } from "../../TimeContext.js"
import { NamedPlace, RR0CaseSummary } from "./RR0CaseSummary.js"
import { Place } from "../../../place/Place.js"
import { Publication, Source } from "../../../source/Source.js"
import { CityService } from "../../../org/country/region/department/city/CityService.js"
import { Organization } from "../../../org/Organization.js"

export class RR0HttpDatasource extends RR0Datasource {

  http = new HttpSource()

  constructor(readonly baseUrl: URL, readonly searchPath: string, protected cityService: CityService) {
    super()
  }

  id(dateTime: TimeContext, place: NamedPlace | undefined): string {
    return dateTime.toString() + (place?.org ? "$" + place.org?.dirName.replaceAll("/", "_") : "")
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

  findRows(doc: HTMLElement) {
    const rowEls = doc.querySelectorAll("ul.indexed li")
    return Array.from(rowEls)
  }

  protected async readCases(context: HtmlRR0SsgContext): Promise<RR0CaseSummary[]> {
    const queryUrl = this.queryUrl(context)
    const doc = await this.http.get(queryUrl)
    const rows = this.findRows(doc)
    return this.getFromRows(context, rows)
  }

  getFromRow(context: HtmlRR0SsgContext, r: Element): RR0CaseSummary {
    const row = r.cloneNode(true) as Element
    const caseLink = context.file.name
    const url = new URL(caseLink, this.baseUrl)
    const timeEl = row.querySelector("time") as HTMLTimeElement
    const itemContext = context.clone()
    const itemTime = itemContext.time
    if (timeEl) {
      url.hash = timeEl.dateTime
      itemTime.updateFromStr(timeEl.dateTime)
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
    const id = this.id(itemTime, place)
    return {type: "case", events: [], url: url.href, place, time: itemTime, description, sources, id}
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
      const parsedTime = TimeContext.parseDateTime(timeStr)
      let time: TimeContext
      let publisher: string
      if (parsedTime) {
        time = new TimeContext()
        if (parsedTime.yearStr) {
          const year = parseInt(parsedTime.yearStr, 10)
          if (!Number.isNaN(year)) {
            time.setYear(year)
          }
        }
        if (parsedTime.monthStr) {
          const month = parseInt(parsedTime.monthStr, 10)
          if (!Number.isNaN(month)) {
            time.setMonth(month)
          }
        }
        if (parsedTime.dayOfMonthStr) {
          const dayOfMonth = parseInt(parsedTime.dayOfMonthStr, 10)
          if (!Number.isNaN(dayOfMonth)) {
            time.setDayOfMonth(dayOfMonth)
          }
        }
        if (parsedTime.hour) {
          time.setHour(parseInt(parsedTime.hour, 10))
        }
        if (parsedTime.minutes) {
          time.setMinutes(parseInt(parsedTime.minutes, 10))
        }
        if (parsedTime.timeZone) {
          time.setTimeZone(parsedTime.timeZone)
        }
        pubItems.pop()
      }
      publisher = pubItems.splice(1, pubItems.length - 1).map(item => item.trim()).join(", ").trim()
      const publication: Publication = {publisher, time}
      title = pubItems[0]
      const source: Source = {events: [], title, id, authors, publication, previousSourceRefs: []}
      sources.push(source)
    }
    return sources
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
        name = org.getMessages(context).toTitle(context, org, {parent: true})
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

  protected queryUrl(context: HtmlRR0SsgContext): URL {
    const time = context.time
    const day = time.getDayOfMonth()
    const month = time.getMonth()
    const year = time.getYear()
    const searchUrl = new URL(this.searchPath, this.baseUrl)
    const sign = year < 0 ? "-" : ""
    let timeStr = sign + String(Math.abs(year)).padStart(4, "0").split("").join("/")
    if (month) {
      timeStr = UrlUtil.join(timeStr, String(month).padStart(2, "0"))
      if (day) {
        timeStr = UrlUtil.join(timeStr, String(day).padStart(2, "0"))
      }
    }
    searchUrl.pathname = UrlUtil.join(searchUrl.pathname, timeStr)
    return searchUrl
  }
}
