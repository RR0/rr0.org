import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { Time } from "./Time"
import { TimeParseResult } from "./TimeReplacer"

/**
 * Time context for a RR0 page.
 */
export class TimeContext {

  static readonly durationRegexp = new RegExp("P(:?(\\d+)D)?(:?(\\d+)H)?(:?(\\d+)M)?(:?(\\d+)S)?")

  static readonly dateTimeRegexp = new RegExp(
    "^(~)?(-?\\d{3,})?(?:-?([0-1]\\d)(?!\:))?(?:-?([0-3]\\d{1,2}(?!\:)))?(?:[T ]?(?:([0-2]\\d):([0-5]\\d))?)?(?: ?([A-Z]{3}))?"
  )

  static parseDateTime(timeStr: string): TimeParseResult {
    const dateTimeValues = TimeContext.dateTimeRegexp.exec(timeStr)
    if (dateTimeValues && dateTimeValues[0]) {
      const [approximate, yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone] = dateTimeValues.slice(1)
      return {approximate, yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone}
    }
    return undefined
  }

  constructor(
    readonly options: Intl.DateTimeFormatOptions,
    protected _year?: number, protected _month?: number, protected _dayOfMonth?: number,
    protected _hour?: number, protected _minutes?: number, protected _timeZone?: string,
    public approximate: boolean = false,
    public approximateTime: boolean = false,
    public from: TimeContext | undefined = undefined,
    public to: TimeContext | undefined = undefined,
    public duration: number | undefined = undefined
  ) {
  }

  getYear(): number | undefined {
    return this._year
  }

  updateFromStr(timeStr: string) {
    if (timeStr) {
      const intervalDelimiter = timeStr.indexOf("/")
      this.reset()
      if (intervalDelimiter >= 0) {
        const startStr = timeStr.substring(0, intervalDelimiter)
        const endStr = timeStr.substring(intervalDelimiter + 1)
        if (startStr) {
          this.from = this.clone()
          TimeContext.updateValueFromStr(this.from, startStr)
          if (endStr) {
            this.to = this.clone()
            TimeContext.updateValueFromStr(this.to, endStr)
          } else {
            this.to = undefined
          }
        } else {
          this.from = undefined
          this.to = this.clone()
          TimeContext.updateValueFromStr(this.to, endStr)
        }
      } else {
        TimeContext.updateValueFromStr(this, timeStr)
      }
    }
  }

  static readonly MINUTE = 60
  static readonly HOUR = 60 * TimeContext.MINUTE
  static readonly DAY = 24 * TimeContext.HOUR

  static updateValueFromStr(context: TimeContext, timeStr: string) {
    const durationValues = TimeContext.durationRegexp.exec(timeStr)
    if (durationValues && durationValues[0]) {
      const map = durationValues.slice(1)
      const [daysStr, hoursStr, minutesStr, secondsStr] = map.reduce((reduced: string[], current: string, i) => {
        if (i % 2 !== 0) {
          reduced.push(current)
        }
        return reduced
      }, [])
      const days = parseInt(daysStr, 10) || 0
      const hours = parseInt(hoursStr, 10) || 0
      const minutes = parseInt(minutesStr, 10) || 0
      const seconds = parseInt(secondsStr, 10) || 0
      context.duration = seconds + (minutes * TimeContext.MINUTE) + (hours * TimeContext.HOUR) + (days * TimeContext.DAY)
    } else {
      TimeContext.updateTimeFromStr(context, timeStr)
    }
  }

  static updateTimeFromStr(context: TimeContext, timeStr: string): TimeContext {
    const result = TimeContext.parseDateTime(timeStr)
    if (result) {
      const {approximate, yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone} = result
      context.approximate = Boolean(approximate)
      context.setYear(parseInt(yearStr, 10))
      if (monthStr) {
        context.setMonth(parseInt(monthStr, 10))
      }
      if (dayOfMonthStr) {
        context.setDayOfMonth(parseInt(dayOfMonthStr, 10))
      }
      if (hour) {
        context.setHour(parseInt(hour, 10))
      }
      if (minutes) {
        context.setMinutes(parseInt(minutes, 10))
      }
      if (timeZone) {
        context.setTimeZone(timeZone)
      }
    }
    return context
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
      this._timeZone, this.approximate, this.approximateTime, this.from, this.to, this.duration)
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
    this.from = undefined
    this.to = undefined
    this.duration = undefined
    return this
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
    let s = this.approximate ? "~" : ""
    if (this.isSet(year)) {
      s += String(year)
    }
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
