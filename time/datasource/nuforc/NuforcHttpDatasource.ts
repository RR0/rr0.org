import { RR0SsgContext } from "../../../RR0SsgContext"
import { HttpSource } from "../HttpSource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { NuforcCaseSummary } from "./NuforcCaseSummary"
import { ObjectUtil } from "../../../util/ObjectUtil"
import { NuforcState } from "./NuforcState"
import assert from "assert"
import { TimeContext } from "../../TimeContext"
import { NuforcCountry } from "./NuforcCountry"
import { NuforcShape } from "./NuforcShape"
import { NuforcDatasource } from "./NuforcDatasource"

interface QueryParameters {
  id: string
}

export class NuforcHttpDatasource extends NuforcDatasource {
  protected static readonly dateFormat = /(\d\d)\/(\d\d)\/(\d\d\d\d) (\d\d):(\d\d)/
  protected readonly http = new HttpSource()

  constructor(readonly baseUrl: URL = new URL("https://nuforc.org"), readonly searchPath = "subndx") {
    super()
  }

  protected queryUrl(context: RR0SsgContext): URL {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    const queryParams: QueryParameters = {
      id: "e" + year + String(month).padStart(2, "0")
    }
    const queryParamsStr = UrlUtil.objToQueryParams(queryParams)
    const searchUrl = new URL(this.searchPath, this.baseUrl)
    searchUrl.search = queryParamsStr
    return searchUrl
  }

  protected async readCases(context: RR0SsgContext): Promise<NuforcCaseSummary[]> {
    const searchUrl = this.queryUrl(context)
    const doc = await this.http.get(searchUrl, {headers: {accept: "text/html;charset=utf-8"}})
    const rowEls = doc.querySelectorAll("#table_1 tbody tr")
    return Array.from(rowEls).map(row => this.getNativeCase(context, row))
  }

  protected getShape(shapeField: HTMLTableCellElement): NuforcShape {
    return NuforcShape[shapeField.textContent]
  }

  protected getCountry(countryField: HTMLTableCellElement): NuforcCountry {
    const countryStr = countryField.textContent
    const country = ObjectUtil.enumFromValue<NuforcCountry>(NuforcCountry, countryStr)
    assert.ok(country, `Unknown NUFORC country "${countryStr}"`)
    return country
  }

  protected getState(caseField: HTMLTableCellElement): NuforcState {
    const stateStr = caseField.textContent
    return ObjectUtil.enumFromValue<NuforcState>(NuforcState, stateStr)
  }

  protected getTime(dateField: HTMLTableCellElement, context: RR0SsgContext): TimeContext {
    const dateFields = NuforcHttpDatasource.dateFormat.exec(dateField.textContent)
    const itemContext = context.clone()
    const dateTime = itemContext.time
    dateTime.setYear(parseInt(dateFields[3], 10))
    dateTime.setMonth(parseInt(dateFields[1], 10))
    const dayOfMonth = dateFields[2]
    dateTime.setDayOfMonth(dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined)
    const hour = parseInt(dateFields[4], 10)
    const minutes = parseInt(dateFields[5], 10)
    dateTime.setHour(hour)
    dateTime.setMinutes(minutes)
    return dateTime
  }

  protected getLink(caseField: HTMLTableCellElement): URL {
    const caseLink = caseField.firstElementChild as HTMLAnchorElement
    return new URL(caseLink.href, this.baseUrl)
  }

  protected dateFromField(reportField: HTMLTableCellElement) {
    return new Date(reportField.textContent)
  }

  protected getImage(imageField: HTMLTableCellElement) {
    return imageField.textContent === "Y"
  }

  protected getNativeCase(context: RR0SsgContext, row: Element): NuforcCaseSummary {
    const columns = row.querySelectorAll("td")
    const url = this.getLink(columns[0])
    const caseNumber = new URLSearchParams(url.search).get("id")
    const time = this.getTime(columns[1], context)
    const city = columns[2].textContent
    const state = this.getState(columns[3])
    const country = this.getCountry(columns[4])
    const shape = this.getShape(columns[5])
    const summary = columns[6].textContent
    const reportDate = this.dateFromField(columns[7])
    const postDate = this.dateFromField(columns[8])
    const image = this.getImage(columns[9])
    return {id: caseNumber, url: url.href, city, state, country, time, shape, summary, reportDate, postDate, image}
  }
}
