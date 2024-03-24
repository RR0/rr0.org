import { RR0SsgContext } from "../../../RR0SsgContext"
import { UfoSearchDatasource } from "./UfoSearchDatasource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { TimeContext } from "../../TimeContext"
import { HttpSource } from "../HttpSource"
import { By } from "selenium-webdriver"
import assert from "assert"
import { UfoSearchCase, UfoSearchCaseType } from "./UfoSearchCase"

interface QueryParameters {
  sy?: number
  sm?: number
  sd?: number
  ey?: number
  em?: number
  ed?: number
}

export class UfoSearchHttpDatasource extends UfoSearchDatasource {

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

  protected async readCases(context: RR0SsgContext): Promise<UfoSearchCase[]> {
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

  protected setDate(time: TimeContext, dateStr: string) {
    const dateFields = /(Late\s+)?(?:(\d{1,2})\/)?(?:(\d{1,2})\/)?(\d+)('s)?(\s+\(approximate\))?\s+#(\d+)/.exec(
      dateStr)
    assert.ok(dateFields, `Could not parse date "${dateStr}"`)
    const yearStr = dateFields[4]
    time.setYear(yearStr ? parseInt(yearStr, 10) : undefined)
    const monthStr = dateFields[2]
    time.setMonth(monthStr ? parseInt(monthStr, 10) : undefined)
    const dayOfMonthStr = dateFields[3]
    time.setDayOfMonth(dayOfMonthStr ? parseInt(dayOfMonthStr, 10) : undefined)
    time.approximate = Boolean(dateFields[6])
  }

  protected async getFromRow(context: RR0SsgContext, row: Element): Promise<UfoSearchCase> {
    const fieldsHeadings = Array.from(row.querySelectorAll("strong"))
    const dateLabel = fieldsHeadings.find(heading => heading.textContent.indexOf("Date") >= 0)
    const itemContext = context.clone()
    const dateTime = itemContext.time.reset()
    let url: URL
    let caseNumber
    if (dateLabel) {
      const dateLink = dateLabel.nextElementSibling as HTMLAnchorElement
      url = new URL(dateLink.href, this.baseUrl)
      caseNumber = url.hash.substring(1)
      this.setDate(dateTime, dateLink.textContent)
    }
    const timeLabel = fieldsHeadings.find(heading => heading.textContent.indexOf("Time") >= 0)
    if (timeLabel) {
      this.setTime(dateTime, timeLabel)
    }
    const locationLabel = fieldsHeadings.find(heading => heading.textContent.indexOf("Location") >= 0)
    let location: string | undefined
    if (locationLabel) {
      location = locationLabel.nextSibling.textContent.trim()
    }
    const descriptionLabel = fieldsHeadings.find(heading => heading.textContent.indexOf("Description") >= 0)
    let desc
    if (descriptionLabel) {
      desc = descriptionLabel.nextSibling.textContent.trim()
    }
    const typeLabel = fieldsHeadings.find(heading => heading.textContent.indexOf("Type") >= 0)
    let type: UfoSearchCaseType
    if (typeLabel) {
      type = typeLabel.nextSibling.textContent.trim() as UfoSearchCaseType
    }
    let attributes
    let extraData
    return {
      caseNumber, dateTime, location, desc: type,
      key_vals: {url},
      attributes,
      ref: "",
      search: "",
      source: "",
      source_id: "",
      type: UfoSearchCaseType.ufoSightings,
      extraData
    }
  }

  protected setTime(dateTime: TimeContext, timeLabel: HTMLElement) {
    const timeValue = timeLabel.nextSibling.textContent
    const timeFields = /(~)?(\d{1,2}):(\d{1,2})(\?)?/.exec(timeValue)
    assert.ok(timeFields, `Could not parse time "${timeValue}"`)
    dateTime.approximateTime = Boolean(timeFields[0] || timeFields[4])
    const hourStr = timeFields[1]
    if (hourStr) {
      dateTime.setHour(parseInt(hourStr, 10))
    }
    const minutesStr = timeFields[2]
    if (minutesStr) {
      dateTime.setHour(parseInt(minutesStr, 10))
    }
  }
}
