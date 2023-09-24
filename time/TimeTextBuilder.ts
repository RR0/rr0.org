import { RR0SsgContext } from '../RR0SsgContext';

export class TimeTextBuilder {
  /**
   * Build a textual representation of context's time, according to context's locale.
   *
   * @param context
   * @param print
   */
  static build(context: RR0SsgContext, print = true): string {
    const time = context.time
    let printOptions: Intl.DateTimeFormatOptions = {}
    let date = new Date()
    const year = time.getYear()
    if (year) {
      date.setFullYear(year)
      if (print) {
        printOptions.year = context.time.options.year
      }
    }
    const month = time.getMonth()
    if (month) {
      date.setDate(1) // Avoid increasing month if today is > 30
      date.setMonth(month - 1)
      if (print) {
        printOptions.month = context.time.options.month
      }
    }
    const dayOfMonth = time.getDayOfMonth()
    if (dayOfMonth) {
      date.setDate(dayOfMonth)
      // if (print) {
      printOptions.day = context.time.options.day
      printOptions.weekday = context.time.options.weekday
      //  }
    }
    const hour = time.getHour()
    if (hour) {
      date.setHours(hour)
      //    if (print) {
      printOptions.hour = context.time.options.hour
      //     }
    }
    const minutes = time.getMinutes()
    if (minutes) {
      date.setMinutes(minutes)
      //   if (print) {
      printOptions.minute = context.time.options.minute
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
      text = date.toLocaleString(context.locale, printOptions)
    }
    return text
  }
}
