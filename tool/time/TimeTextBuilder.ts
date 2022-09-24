import {SsgContext} from "../SsgContext"

export class TimeTextBuilder {

  static build(context: SsgContext, b = true): string {
    const time = context.time
    let printOptions: Intl.DateTimeFormatOptions = {}
    let date = new Date()

    function setYear(year: number) {
      date.setFullYear(year)
      if (b) {
        printOptions.year = context.time.options.year
      }
    }

    function setMonth(month: number) {
      date.setDate(1) // Avoid increasing month if today is > 30
      date.setMonth(month - 1)
      if (b) {
        printOptions.month = context.time.options.month
      }
    }

    function setDayOfMonth(dayOfMonth: number) {
      date.setDate(dayOfMonth)
      printOptions.day = context.time.options.day
      printOptions.weekday = context.time.options.weekday
    }

    function setHour(hour: number) {
      date.setHours(hour)
      printOptions.hour = context.time.options.hour
    }

    function setMinutes(minutes: number) {
      date.setMinutes(minutes)
      printOptions.minute = context.time.options.minute
    }

    function setTimeZone(timeZone: string) {
      printOptions.timeZoneName = context.time.options.timeZoneName
    }

    const year = time.year
    if (year) {
      setYear(year)
    }
    const month = time.month
    if (month) {
      setMonth(month)
    }
    const dayOfMonth = time.dayOfMonth
    if (dayOfMonth) {
      setDayOfMonth(dayOfMonth)
    }
    const hour = time.hour
    if (hour) {
      setHour(hour)
    }
    const minutes = time.minutes
    if (minutes) {
      setMinutes(minutes)
    }
    const timeZone = time.timeZone
    if (timeZone) {
      //    setTimeZone(timeZone)
    }
    let text: string
    if (Number.isNaN(date.getTime())) {
      text = ""
      // TODO: Handle partial date (month only, etc.)
    } else {  // Valid date?
      text = date.toLocaleString(context.locales, printOptions)
    }
    return text
  }
}
