import {SsgContext} from "./SsgContext"

export class TextDateBuilder {

  static build(context: SsgContext): string {
    const time = context.time
    const printOptions: Intl.DateTimeFormatOptions = {}
    const date = new Date()

    function setYear(year: number) {
      date.setFullYear(year)
      printOptions.year = context.options.year
    }

    function setMonth(month: number) {
      date.setDate(1) // Avoid increasing month if today is > 30
      date.setMonth(month - 1)
      printOptions.month = context.options.month
    }

    function setDayOfMonth(dayOfMonth: number) {
      date.setDate(dayOfMonth)
      printOptions.day = context.options.day
      printOptions.weekday = context.options.weekday
    }

    function setHour(hour: number) {
      date.setHours(hour)
      printOptions.hour = context.options.hour
    }

    function setMinutes(minutes: number) {
      date.setMinutes(minutes)
      printOptions.minute = context.options.minute
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
