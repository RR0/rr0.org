import {ReplacerFactory} from "./replace/ReplacerFactory"
import {SsgReplacer} from "./replace/SsgReplacer"
import {UrlDateBuilder} from "./UrlDateBuilder"
import {TextDateBuilder} from "./TextDateBuilder"
import {SsgContext} from "./SsgContext"
import {RelativeTextDateBuilder} from "./RelativeTextDateBuilder"

export class TimeReplacerFactory implements ReplacerFactory {

  static readonly dateTimeRegexp = new RegExp("^(-?\\d{3,})?(?:-([0-1]\\d))?(?:-([0-3]\\d))?(?:[ T]?(?:([0-2]\\d):([0-5]\\d))?)?(?: ?([A-Z]{3}))?")

  static valueReplacement(context: SsgContext, timeStr: string): string | undefined {
    const previousContext: SsgContext = context.clone()
    let replacement = undefined
    timeStr = timeStr.trim()
    let regExpExecArray = this.dateTimeRegexp.exec(timeStr)
    if (regExpExecArray) {
      let timeContext = context.time
      const [yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone] = regExpExecArray.slice(1, 1 + 6)
      if (yearStr) {
        const year = parseInt(yearStr, 10)
        if (!Number.isNaN(year)) {
          timeContext.year = year
        }
      }
      if (monthStr) {
        const month = parseInt(monthStr, 10)
        if (!Number.isNaN(month)) {
          timeContext.month = month
        }
      }
      if (dayOfMonthStr) {
        const dayOfMonth = parseInt(dayOfMonthStr, 10)
        if (!Number.isNaN(dayOfMonth)) {
          timeContext.dayOfMonth = dayOfMonth
        }
      }
      if (hour) {
        timeContext.hour = parseInt(hour, 10)
      }
      if (minutes) {
        timeContext.minutes = parseInt(minutes, 10)
      }
      if (timeZone) {
        timeContext.timeZone = timeZone
      }
      if (timeContext.isDefined()) {
        let url = UrlDateBuilder.build(context)
        let title = TextDateBuilder.build(context)
        let text = RelativeTextDateBuilder.build(previousContext, context)
        replacement = `<a href="${url}" title="${title}">${text}</a>`
      }
    }
    return replacement
  }

  static replacement(context: SsgContext, substring: string, timeStr: string): string {
    let parts = timeStr.split("/")
    let replacement: string
    if (parts.length > 1) {
      const startReplacement = TimeReplacerFactory.valueReplacement(context, parts[0])
      const endReplacement = TimeReplacerFactory.valueReplacement(context, parts[1])
      replacement = startReplacement + " à " + endReplacement
    } else {
      replacement = TimeReplacerFactory.valueReplacement(context, timeStr) || substring
    }
    console.log("\tReplacing", substring, "with", replacement)
    return replacement
  }

  create(context: SsgContext): SsgReplacer {
    return {
      replacer:
        /**
         * Replace time tags but urls.
         */
        (substring: string, ...args: any[]): string => {
          const timeStr = args[0]
          return TimeReplacerFactory.replacement(context, substring, timeStr)
        }
    }
  }
}
