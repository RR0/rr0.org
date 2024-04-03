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
      this.setMinutes(undefined, print)
    }
    this._hour = hour
    return this
  }

  getMinutes(): number | undefined {
    return this._minutes
  }

  setMinutes(minutes: number | undefined, print = true) {
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

  toString(): string {
    let s = String(this.getYear())
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
      s += " " + String(hour).padStart(2, "0")
    }
    const minutes = this.getMinutes()
    if (this.isSet(minutes)) {
      s += ":" + String(minutes).padStart(2, "0")
    }
    return s
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
}
