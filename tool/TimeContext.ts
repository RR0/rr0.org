export class TimeContext {

  constructor(
    protected _year?: number, protected _month?: number, protected _dayOfMonth?: number,
    protected _hour?: number, protected _minutes?: number, protected _timeZone?: string
  ) {
  }

  get year(): number | undefined {
    return this._year
  }

  set year(year: number | undefined) {
    if (year != this.year) {
      this.month = undefined
    }
    this._year = year
  }

  get month(): number | undefined {
    return this._month
  }

  set month(month: number | undefined) {
    if (month != this.month) {
      this.dayOfMonth = undefined
    }
    this._month = month
  }

  get dayOfMonth(): number | undefined {
    return this._dayOfMonth
  }

  set dayOfMonth(dayOfMonth: number | undefined) {
    if (dayOfMonth != this._dayOfMonth) {
      this.hour = undefined
    }
    this._dayOfMonth = dayOfMonth
  }

  get hour(): number | undefined {
    return this._hour
  }

  set hour(hour: number | undefined) {
    if (hour != this._hour) {
      this.minutes = undefined
    }
    this._hour = hour
  }

  get minutes(): number | undefined {
    return this._minutes
  }

  set minutes(minutes: number | undefined) {
    this._minutes = minutes
  }

  get timeZone(): string | undefined {
    return this._timeZone
  }

  set timeZone(timeZone: string | undefined) {
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
    return new TimeContext(this._year, this._month, this._dayOfMonth, this._hour, this._minutes, this._timeZone)
  }
}
