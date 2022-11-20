/**
 * Time context for a RR0 page.
 */
export class TimeContext {

  constructor(
    readonly options: Intl.DateTimeFormatOptions,
    protected _year?: number, protected _month?: number, protected _dayOfMonth?: number,
    protected _hour?: number, protected _minutes?: number, protected _timeZone?: string
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
  }

  getMonth(): number | undefined {
    return this._month
  }

  setMonth(month: number | undefined, print = true) {
    if (month != this._month && print) {
      this.setDayOfMonth(undefined, print)
    }
    this._month = month
  }

  getDayOfMonth(): number | undefined {
    return this._dayOfMonth
  }

  setDayOfMonth(dayOfMonth: number | undefined, print = true) {
    if (dayOfMonth != this._dayOfMonth && print) {
      this.setHour(undefined, print)
    }
    this._dayOfMonth = dayOfMonth
  }

  getHour(): number | undefined {
    return this._hour
  }

  setHour(hour: number | undefined, print = true) {
    if (hour != this._hour && print) {
      this.setMinutes(undefined, print)
    }
    this._hour = hour
  }

  getMinutes(): number | undefined {
    return this._minutes
  }

  setMinutes(minutes: number | undefined, print = true) {
    this._minutes = minutes
  }

  getTimeZone(): string | undefined {
    return this._timeZone
  }

  setTimeZone(timeZone: string | undefined) {
    this._timeZone = timeZone
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
      this._timeZone)
  }

  reset(): void {
    this.setYear(undefined)
  }
}
