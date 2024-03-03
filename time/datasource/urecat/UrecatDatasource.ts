import { RR0SsgContext } from "../../../RR0SsgContext"
import { HttpCaseSource } from "../HttpCaseSource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { UrecatCase, UrecatWitness } from "./UrecatCase"
import { TimeTextBuilder } from "../../TimeTextBuilder"

export class UrecatDatasource extends HttpCaseSource<UrecatCase> {

  protected static readonly urlDateFormat = /(\d\d\d\d)(?:-(\d\d)(?:-(\d\d))?)?/
  protected static readonly count: { [key: string]: number } = {
    "deux": 2,
    "trois": 3,
    "quatre": 4,
    "cinq": 5,
    "six": 6,
    "sept": 7
  }

  constructor(readonly baseUrl = "https://ufologie.patrickgross.org", readonly searchPath = "ce3") {
    super("Patrick Gross", "URECAT (Les ovnis vus de près)")
  }

  async getAll(context: RR0SsgContext): Promise<UrecatCase[]> {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    const searchUrl = this.getSearchUrl()
    const lang = context.locale === "fr" ? "f" : ""
    const requestUrl = UrlUtil.join(searchUrl, `_${year}${lang}.htm`)
    const page = await this.fetch<string>(requestUrl, {headers: {accept: "text/html;charset=iso-8859-1"}})
    const doc = new JSDOM(page).window.document.documentElement
    /*const charSetMeta = doc.querySelector("meta[http-equiv='Content-Type']")
    const contentType = charSetMeta.getAttribute("content")
    let charset = findParam(contentType, ";", "charset") as BufferEncoding
    if (charset.startsWith("iso-8859")) {
      charset = "latin1"
    }
    const decoder = new TextDecoder(charset)*/
    const rowEls = doc.querySelectorAll("table tr")
    const rows = Array.from(rowEls)
    rows.shift()
    const cases = Array.from(rows).map(row => this.getFromRow(context, row))
    return cases.filter(c => c.basicInfo.base.sightingDate.getMonth() === month)
  }

  getWitnesses(witnessesStr: string): UrecatWitness[] {
    let lastName = ""
    const andNames = witnessesStr
      .split(" et ")
      .flatMap(and => and.split(","))
      .map(m => m.trim())
      .map(m => m.replace(/^ses /, ""))
      .flatMap(name => {
        const lowName = name.toLowerCase()
        const countEntry = Object.entries(UrecatDatasource.count).find(entry => {
          if (lowName.startsWith(entry[0] + " ")) {
            return entry
          }
        })
        if (countEntry) {
          const oneName = lowName.substring(countEntry[0].length + 1).slice(0, -1)
          const witnesses = []
          for (let i = 1; i <= countEntry[1]; i++) {
            witnesses.push(oneName + " " + i)
          }
          return witnesses
        } else {
          const names = name.split(" ")
          if (names.length > 1) {
            lastName = names[names.length - 1]
          }
          return name
        }
      })
    return andNames.map(name => {
      if (name.indexOf(" ") < 0 && name.indexOf("'") < 0) {
        name = name + (lastName ? " " + lastName : "")
      }
      return {name}
    })
  }

  protected getSearchUrl(): string {
    return UrlUtil.join(this.baseUrl, this.searchPath)
  }

  protected getLocation(column: HTMLTableCellElement) {
    const [placeName, departmentOrState, country] = column.textContent.split(",").map(s => s.trim())
    return {placeName, country, departmentOrState}
  }

  protected getDate(context: RR0SsgContext, url: URL): RR0SsgContext {
    const timeStr = url.href.substring(this.getSearchUrl().length + 1)
    const dateFields = UrecatDatasource.urlDateFormat.exec(timeStr)
    const itemContext = context.clone()
    const dateTime = itemContext.time
    dateTime.setYear(parseInt(dateFields[1], 10))
    const monthField = dateFields[2]
    if (monthField) {
      dateTime.setMonth(parseInt(monthField, 10))
      const dayOfMonth = dateFields[3]
      if (dayOfMonth) {
        dateTime.setDayOfMonth(dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined)
      }
    }
    dateTime.options.weekday = undefined
    return itemContext
  }

  protected getLink(linkCol: HTMLTableCellElement) {
    const caseLink = linkCol.firstElementChild as HTMLAnchorElement
    return new URL(UrlUtil.join(this.searchPath, caseLink.href), this.baseUrl)
  }

  protected getFromRow(context: RR0SsgContext, row: Element): UrecatCase {
    const columns = row.querySelectorAll("td")
    const url = this.getLink(columns[1])
    const timeContext = this.getDate(context, url)
    const {placeName, departmentOrState, country} = this.getLocation(columns[1])
    const witnesses = this.getWitnesses(columns[2].textContent)
    const timeStr = TimeTextBuilder.build(timeContext)
    const sightingDate = timeContext.time
    const title = `${timeStr}, ${placeName}, ${departmentOrState}, ${country}, ${witnesses.length} personne(s)`.toUpperCase()
    return {url, title, basicInfo: {base: {sightingDate, location: {placeName, country, departmentOrState}, witnesses}}}
  }
}
