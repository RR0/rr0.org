import { RR0SsgContext } from "../RR0SsgContext.js"

export class TimeTextBuilder {

  constructor(readonly options: Intl.DateTimeFormatOptions) {
  }

  /**
   * Build a textual representation of context's time, according to context's locale.
   *
   * @param context
   * @param print
   * @param options
   */
  build(context: RR0SsgContext, print = true, options = this.options): string {
    const time = context.time
    const printOptions: Intl.DateTimeFormatOptions = {}
    const date = new Date(undefined, undefined, undefined)
    const year = time.getYear()
    if (year) {
      date.setFullYear(year)
      if (print) {
        printOptions.year = options.year
      }
    }
    const month = time.getMonth()
    if (month) {
      date.setDate(1) // Avoid increasing month if today is > 30
      date.setMonth(month - 1)
      if (print) {
        printOptions.month = options.month
      }
    }
    const dayOfMonth = time.getDayOfMonth()
    if (dayOfMonth) {
      date.setDate(dayOfMonth)
      // if (print) {
      printOptions.day = options.day
      printOptions.weekday = options.weekday
      //  }
    }
    const hour = time.getHour()
    if (hour) {
      date.setHours(hour)
      //    if (print) {
      printOptions.hour = options.hour
      //     }
    }
    const minutes = time.getMinutes()
    if (minutes) {
      date.setMinutes(minutes)
      //   if (print) {
      printOptions.minute = options.minute
      //   }
    }
    const timeZone = time.getTimeZone()
    if (timeZone) {
      if (print) {
        // printOptions.timeZoneName = context.time.options.timeZoneName
      }
    }
    let text: string
    if (Number.isNaN(date.getTime())) {
      text = ""
      // TODO: Handle partial date (month only, etc.)
    } else {  // Valid date?
      const locale = context.file.lang.lang || context.locale
      if (year < 0) {
        date.setFullYear(date.getFullYear() + 1)
        printOptions.era = "narrow"
      }
      text = date.toLocaleString(locale, printOptions)
    }
    return text
  }
}
