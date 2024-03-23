import { RR0SsgContext } from "../../../RR0SsgContext"
import { UfoSearchCase, UfoSearchCaseType, UfoSearchDatasource } from "./UfoSearchDatasource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { TimeContext } from "../../TimeContext"
import { HttpSource } from "../HttpSource"
import { By } from "selenium-webdriver"
import assert from "assert"

interface QueryParameters {
  sy?: number
  sm?: number
  sd?: number
  ey?: number
  em?: number
  ed?: number
}

export class UfoSearchHttpDatasource extends UfoSearchDatasource {

  static readonly dateFormat = /^(Late )?(?:(\d{1,2})\/)?(?:(\d{1,2})\/)?(\d+)('s)?( \(approximate\))? #(\d+)/gm

  constructor(readonly baseUrl: string, readonly searchPath: string) {
    super()
  }
  protected readonly http = new HttpSource()

  queryUrl(year: number | undefined, month: number | undefined, day: number | undefined): string {
    const queryParams: QueryParameters = {}
    if (year) {
      queryParams.ey = queryParams.sy = year
    }
    if (month) {
      queryParams.em = queryParams.sm = month
    }
    if (day) {
      queryParams.sd = queryParams.ed = day
    }
    const queryParamsStr = UrlUtil.objToQueryParams(queryParams)
    const searchUrl = new URL(this.searchPath, this.baseUrl)
    searchUrl.search = queryParamsStr
    return searchUrl.href
  }

  protected async readSummaries(context: RR0SsgContext): Promise<UfoSearchCase[]> {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    const queryUrl = this.queryUrl(year, month, day)
    const driver = await this.http.getDriver()
    try {
      await driver.get(queryUrl)
      const resultSelector = "#output hr + p"
      await driver.findElements(By.css(resultSelector))
      const page = await driver.getPageSource()
      const doc = new JSDOM(page).window.document.documentElement
      const rowEls = doc.querySelectorAll(resultSelector)
      const rows = Array.from(rowEls)
      const cases: UfoSearchCase[] = []
      for (const row of rows) {
        cases.push(await this.getFromRow(context, row))
      }
      return cases
    } finally {
      await this.http.close()
    }
  }

  protected getBoolean(field: HTMLTableCellElement) {
    return field.textContent === "Oui"
  }

  protected getDate(context: RR0SsgContext, dateStr: string): TimeContext {
    const dateFields = UfoSearchHttpDatasource.dateFormat.exec(dateStr)
    assert.ok(dateFields, `Could not parse date "${dateStr}"`)
    const itemContext = context.clone()
    const dateTime = itemContext.time
    const yearStr = dateFields[4]
    dateTime.setYear(yearStr ? parseInt(yearStr, 10) : undefined)
    const monthStr = dateFields[2]
    dateTime.setMonth(monthStr ? parseInt(monthStr, 10) : undefined)
    const dayOfMonthStr = dateFields[3]
    dateTime.setDayOfMonth(dayOfMonthStr ? parseInt(dayOfMonthStr, 10) : undefined)
    return dateTime
  }

  protected setTime(dateTime: TimeContext, timeField: HTMLTableCellElement) {
    const timeFormat = /(\d\d):(\d\d)/
    const timeFields = timeFormat.exec(timeField.textContent)
    const hour = timeFields ? parseInt(timeFields[1], 10) : undefined
    const minutes = timeFields ? parseInt(timeFields[2], 10) : undefined
    dateTime.setHour(hour)
    dateTime.setMinutes(minutes)
    dateTime.setTimeZone("GMT+1")
  }

  protected async getFromRow(context: RR0SsgContext, row: Element): Promise<UfoSearchCase> {
    const fieldsHeadings = row.querySelectorAll("strong")
    const dateLabel = fieldsHeadings[0]
    const dateLink = dateLabel.nextElementSibling as HTMLAnchorElement
    const url = dateLink.href
    const date = this.getDate(context, dateLink.textContent)
    return {
      date,
      location: "",
      desc: "",
      key_vals: {
        url
      },
      ref: "",
      search: "",
      source: "",
      source_id: "",
      type: UfoSearchCaseType.ufoSightings
    }
  }
}
