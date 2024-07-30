import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { Time } from "./Time"

/**
 * Time context for a RR0 page.
 */
export class TimeContext {

  from?: TimeContext

  constructor(
    readonly options: Intl.DateTimeFormatOptions,
    protected _year?: number, protected _month?: number, protected _dayOfMonth?: number,
    protected _hour?: number, protected _minutes?: number, protected _timeZone?: string,
    public approximate: boolean = false,
    public approximateTime: boolean = false
  ) {
  }

  getYear(): number | undefined {
    return this._year
  }

  setYear(year: number | undefined, print = true) {
    if (year != this._year && print) {
      this.setMonth(undefined, print)
    }
    this._year = year
    return this
  }

  getMonth(): number | undefined {
    return this._month
  }

  setMonth(month: number | undefined, print = true) {
    if (month != this._month && print) {
      this.setDayOfMonth(undefined, print)
    }
    this._month = month
    return this
  }

  getDayOfMonth(): number | undefined {
    return this._dayOfMonth
  }

  setDayOfMonth(dayOfMonth: number | undefined, print = true) {
    if (dayOfMonth != this._dayOfMonth && print) {
      this.setHour(undefined, print)
    }
    this._dayOfMonth = dayOfMonth
    return this
  }

  getHour(): number | undefined {
    return this._hour
  }

  setHour(hour: number | undefined, print = true) {
    if (hour != this._hour && print) {
      this.setMinutes(undefined)
    }
    this._hour = hour
    return this
  }

  getMinutes(): number | undefined {
    return this._minutes
  }

  setMinutes(minutes: number | undefined) {
    this._minutes = minutes
    return this
  }

  getTimeZone(): string | undefined {
    return this._timeZone
  }

  setTimeZone(timeZone: string | undefined) {
    this._timeZone = timeZone
    return this
  }

  isDefined(): boolean {
    return this._year != undefined
      || this._month != undefined
      || this._dayOfMonth != undefined
      || this._hour != undefined
      || this._minutes != undefined
  }

  clone(): TimeContext {
    return new TimeContext({...this.options}, this._year, this._month, this._dayOfMonth, this._hour, this._minutes,
      this._timeZone, this.approximate)
  }

  static fromDate(date: Date, options: Intl.DateTimeFormatOptions): TimeContext {
    return new TimeContext({...options}, date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(),
      date.getMinutes(),
      "UTC" + (date.getTimezoneOffset() < 0 ? "-" : "+") + date.getTimezoneOffset())
  }

  reset(): this {
    this.setYear(undefined)
    this.setMonth(undefined)
    this.setDayOfMonth(undefined)
    this.setHour(undefined)
    this.setMinutes(undefined)
    this.approximate = false
    this.approximateTime = false
    return this
  }

  toDate(): Date {
    return new Date(this.toString())
  }

  static fromFileName(context: HtmlRR0SsgContext, fileName = context.file.name): TimeContext | undefined {
    let timeContext: TimeContext | undefined
    let elems
    if (fileName.endsWith("index.html")) {
      while ((elems = fileName.split("/")).length < 6) {
        fileName = elems.slice(0, elems.length - 1).join("/") + "/0/index.html"
      }
    }
    const timeExec = Time.parseFileName(fileName)
    if (timeExec && timeExec.length > 5) {
      const pageContext = context.clone()
      timeContext = pageContext.time
      const m = parseInt(timeExec[2], 10)
      const c = parseInt(timeExec[3], 10)
      const d = parseInt(timeExec[4], 10)
      const u = parseInt(timeExec[5], 10)
      const year = (timeExec[1] ? -1 : 1) * (m * 1000 + c * 100 + d * 10 + u)
      timeContext.setYear(year)
      const monthStr = timeExec[6]
      timeContext.setMonth(monthStr ? parseInt(monthStr, 10) : undefined)
      const dayStr = timeExec[7]
      timeContext.setDayOfMonth(dayStr ? parseInt(dayStr, 10) : undefined)
      timeContext.setHour(undefined)
      timeContext.setMinutes(undefined)
    }
    return timeContext
  }

  protected isSet(value: any) {
    return value != void 0 && value != null
  }

  isBefore(other: TimeContext): boolean {
    return this.toString().localeCompare(other.toString()) < 0
  }

  isAfter(other: TimeContext): boolean {
    return this.toString().localeCompare(other.toString()) > 0
  }

  equals(other: TimeContext): boolean {
    return this.toString() === other.toString()
  }

  toString(): string {
    const year = this.getYear()
    if (!year) {
      return undefined
    }
    let s = String(year)
    const month = this.getMonth()
    if (this.isSet(month)) {
      s += "-" + String(month).padStart(2, "0")
    }
    const day = this.getDayOfMonth()
    if (this.isSet(day)) {
      s += "-" + String(day).padStart(2, "0")
    }
    const hour = this.getHour()
    if (this.isSet(hour)) {
      s += "T" + String(hour).padStart(2, "0")
    }
    const minutes = this.getMinutes()
    if (this.isSet(minutes)) {
      s += ":" + String(minutes).padStart(2, "0")
    }
    return s
  }

  toJSON() {
    return this.toString()
  }
}
