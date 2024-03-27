import { RR0SsgContext } from "../../../RR0SsgContext"
import { JSDOM } from "jsdom"
import { TimeContext } from "../../TimeContext"
import { HttpSource } from "../HttpSource"
import assert from "assert"
import { EssexPoliceDatasource } from "./EssexPoliceDatasource"
import { EssexPoliceCaseSummary } from "./EssexPoliceCaseSummary"
import { By } from "selenium-webdriver"

export class EssexPoliceHttpDatasource extends EssexPoliceDatasource {

  protected readonly http = new HttpSource()

  constructor(readonly baseUrl: string, readonly searchPath: string) {
    super()
  }

  queryUrl(year: number | undefined, month: number | undefined, day: number | undefined): string {
    const searchUrl = new URL(this.searchPath, this.baseUrl)
    return searchUrl.href
  }

  protected async readCases(context: RR0SsgContext): Promise<EssexPoliceCaseSummary[]> {
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
      const cases: EssexPoliceCaseSummary[] = []
      for (const row of rows) {
        cases.push(await this.getFromRow(context, row))
      }
      return cases
    } finally {
      await this.http.close()
    }
  }

  protected getDate(context: RR0SsgContext, dateStr: string): TimeContext {
    const dateFields = /(Late\s+)?(?:(\d{1,2})\/)?(?:(\d{1,2})\/)?(\d+)('s)?(\s+\(approximate\))?\s+#(\d+)/.exec(
      dateStr)
    assert.ok(dateFields, `Could not parse date "${dateStr}"`)
    const itemContext = context.clone()
    const time = itemContext.time
    const yearStr = dateFields[4]
    time.setYear(yearStr ? parseInt(yearStr, 10) : undefined)
    const monthStr = dateFields[2]
    time.setMonth(monthStr ? parseInt(monthStr, 10) : undefined)
    const dayOfMonthStr = dateFields[3]
    time.setDayOfMonth(dayOfMonthStr ? parseInt(dayOfMonthStr, 10) : undefined)
    time.approximate = Boolean(dateFields[6])
    return time
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

  protected async getFromRow(context: RR0SsgContext, row: Element): Promise<EssexPoliceCaseSummary> {
    const dateTime = this.getDate(context, "")
    let district = ""
    let comments = ""
    const url = new URL(this.searchPath, this.baseUrl)
    return {
      id: "",
      url,
      dateTime,
      district,
      comments
    }
  }
}
