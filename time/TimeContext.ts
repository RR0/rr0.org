import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { Time } from "./Time"
import { TimeParseResult } from "./TimeReplacer"
import {
  Level2Date as EdtfDate,
  Level2Duration as EdtfDuration,
  Level2Interval as EdtfInterval,
  Level2Timeshift
} from "@rr0/time"

/**
 * Time context for a RR0 page.
 */
export class TimeContext {

  static readonly dateTimeRegexp = new RegExp(
    "^(~)?(-?\\d{3,})?(?:-?([0-1]\\d)(?!\:))?(?:-?([0-3]\\d{1,2}(?!\:)))?(?:[T ]?(?:([0-2]\\d):([0-5]\\d))?)?(?: ?([A-Z]{3}))?"
  )

  date: EdtfDate | undefined
  interval: EdtfInterval | undefined
  duration: EdtfDuration | undefined

  static parseDateTime(timeStr: string): TimeParseResult {
    const dateTimeValues = TimeContext.dateTimeRegexp.exec(timeStr)
    if (dateTimeValues && dateTimeValues[0]) {
      const [approximate, yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone] = dateTimeValues.slice(1)
      return {approximate, yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone}
    }
    return undefined
  }

  constructor(
    _year?: number,
    _month?: number,
    _dayOfMonth?: number,
    _hour?: number,
    _minutes?: number,
    _timeZone?: string,
    approximate: boolean = false,
    approximateTime: boolean = false,
    /** @deprecated */
    public from: TimeContext | undefined = undefined,
    /** @deprecated */
    public to: TimeContext | undefined = undefined,
    duration: number | undefined = undefined
  ) {
    if (from) {
      this.interval = new EdtfInterval(from?.date, to?.date)
    } else if (duration) {
      this.duration = new EdtfDuration(duration)
    } else {
      this.date = new EdtfDate(
        {year: _year, month: _month, day: _dayOfMonth, hour: _hour, minutes: _minutes, timeZone: _timeZone})
      if (approximate) {
        this.date.year.approximate = true
      }
      if (approximateTime) {
        if (this.date.hour) {
          this.date.hour.approximateComponent = true
        }
        if (this.date.minutes) {
          this.date.minutes.approximateComponent = true
        }
        if (this.date.seconds) {
          this.date.seconds.approximateComponent = true
        }
      }
    }
  }

  get approximate(): boolean {
    return this.date?.approximate || this.interval?.approximate || this.duration?.approximate
  }

  get approximateTime(): boolean {
    return this.approximate || this.date?.hour?.approximate || this.date?.minute?.approximate || this.date?.second?.approximate
  }

  static fromString(timeStr: string): TimeContext {
    const timeContext = new TimeContext()
    timeContext.updateFromStr(timeStr)
    return timeContext
  }

  updateFromStr(timeStr: string) {
    if (timeStr) {
      try {
        this.date = EdtfDate.fromString(timeStr)
        this.duration = undefined
        this.interval = undefined
      } catch (e) {
        try {
          this.interval = EdtfInterval.fromString(timeStr)
          this.date = undefined
          this.duration = undefined
        } catch (e) {
          try {
            this.duration = EdtfDuration.fromString(timeStr)
            this.interval = undefined
            this.date = undefined
          } catch (e) {
            console.warn("Could not resolve time string", timeStr, e.message)
          }
        }
      }
    }
  }

  static readonly MINUTE = 60
  static readonly HOUR = 60 * TimeContext.MINUTE
  static readonly DAY = 24 * TimeContext.HOUR

  getYear(): number | undefined {
    return this.date?.year?.value
  }

  setYear(year: number | undefined, print = true) {
    if (year != this.date?.year?.value && print) {
      this.setMonth(undefined, print)
    }
    this.date = this.date || new EdtfDate()
    this.date.year = year
    return this
  }

  getMonth(): number | undefined {
    return this.date?.month?.value
  }

  setMonth(month: number | undefined, print = true) {
    if (month != this.date?.month?.value && print) {
      this.setDayOfMonth(undefined, print)
    }
    this.date = this.date || new EdtfDate()
    this.date.month = month
    return this
  }

  getDayOfMonth(): number | undefined {
    return this.date?.day?.value
  }

  setDayOfMonth(dayOfMonth: number | undefined, print = true) {
    if (dayOfMonth != this.date?.day?.value && print) {
      this.setHour(undefined, print)
    }
    this.date = this.date || new EdtfDate()
    this.date.day = dayOfMonth
    return this
  }

  getHour(): number | undefined {
    return this.date?.hour?.value
  }

  setHour(hour: number | undefined, print = true) {
    if (hour != this.date?.hour?.value && print) {
      this.setMinutes(undefined)
    }
    this.date = this.date || new EdtfDate()
    this.date.hour = hour
    return this
  }

  getMinutes(): number | undefined {
    return this.date?.minute?.value
  }

  setMinutes(minutes: number | undefined) {
    this.date = this.date || new EdtfDate()
    this.date.minute = minutes
    return this
  }

  getTimeZone(): string | undefined {
    return this.date?.timeshift?.toString()
  }

  setTimeZone(timeZone: string | undefined) {
    this.date = this.date || new Level2Timeshift()
    try {
      this.date.timeshift = Level2Timeshift.fromString(timeZone)
    } catch (e) {
      console.warn("Could not resolve time zone", timeZone, e.message)
    }
    return this
  }

  isDefined(): boolean {
    const date = this.date
    if (!date) {
      return false
    }
    return date.year?.value != undefined
      || date.month?.value != undefined
      || date.day?.value != undefined
      || date.hour?.value != undefined
      || date.minute?.value != undefined
  }

  static fromDate(date: Date): TimeContext {
    return new TimeContext(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(),
      "UTC" + (date.getTimezoneOffset() < 0 ? "-" : "+") + date.getTimezoneOffset())
  }

  clone(): TimeContext {
    return new TimeContext(this.date?.year?.value, this.date?.month?.value, this.date?.day?.value,
      this.date?.hour?.value, this.date?.minutes?.value, this.date?.timeshift?.value,
      this.approximate, this.approximateTime, this.from, this.to, this.duration)
  }

  reset(): this {
    this.date = undefined
    this.interval = undefined
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
    return this.date ? this.date.toString() : ""
  }

  toJSON() {
    return this.toString()
  }
}
