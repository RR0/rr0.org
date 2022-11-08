import {RR0SsgContext} from "../RR0SsgContext"

export class TimeTextBuilder {

  static build(context: RR0SsgContext, print = true): string {
    const time = context.time
    let printOptions: Intl.DateTimeFormatOptions = {}
    let date = new Date()

    function setYear(year: number) {
      date.setFullYear(year)
      if (print) {
        printOptions.year = context.time.options.year
      }
    }

    function setMonth(month: number) {
      date.setDate(1) // Avoid increasing month if today is > 30
      date.setMonth(month - 1)
      if (print) {
        printOptions.month = context.time.options.month
      }
    }

    function setDayOfMonth(dayOfMonth: number) {
      date.setDate(dayOfMonth)
      // if (print) {
      printOptions.day = context.time.options.day
      printOptions.weekday = context.time.options.weekday
      //  }
    }

    function setHour(hour: number) {
      date.setHours(hour)
      //    if (print) {
      printOptions.hour = context.time.options.hour
      //     }
    }

    function setMinutes(minutes: number) {
      date.setMinutes(minutes)
      //   if (print) {
      printOptions.minute = context.time.options.minute
      //   }
    }

    function setTimeZone(_timeZone: string) {
      if (print) {
        // printOptions.timeZoneName = context.time.options.timeZoneName
      }
    }

    const year = time.getYear()
    if (year) {
      setYear(year)
    }
    const month = time.getMonth()
    if (month) {
      setMonth(month)
    }
    const dayOfMonth = time.getDayOfMonth()
    if (dayOfMonth) {
      setDayOfMonth(dayOfMonth)
    }
    const hour = time.getHour()
    if (hour) {
      setHour(hour)
    }
    const minutes = time.getMinutes()
    if (minutes) {
      setMinutes(minutes)
    }
    const timeZone = time.getTimeZone()
    if (timeZone) {
      setTimeZone(timeZone)
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
