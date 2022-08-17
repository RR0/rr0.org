import {SsgContext} from "../SsgContext"
import {UrlDateBuilder} from "./UrlDateBuilder"
import {TextDateBuilder} from "./TextDateBuilder"
import {RelativeTextDateBuilder} from "./RelativeTextDateBuilder"

export class TimeReplacer {
  static readonly dateTimeRegexp = new RegExp("^(-?\\d{3,})?(?:-([0-1]\\d))?(?:-([0-3]\\d))?(?:[ T]?(?:([0-2]\\d):([0-5]\\d))?)?(?: ?([A-Z]{3}))?")

  constructor(protected timeFiles: string[]) {
  }

  valueReplacement(context: SsgContext, timeStr: string): string | undefined {
    const previousContext: SsgContext = context.clone()
    let replacement = undefined
    timeStr = timeStr.trim()
    let regExpExecArray = TimeReplacer.dateTimeRegexp.exec(timeStr)
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
        const currentFileName = context.fileInfo?.name!
        while (url !== "time" && this.timeFiles.indexOf(url) < 0) {
          const slash = url.lastIndexOf("/")
          url = url.substring(0, slash)
        }
        const title = TextDateBuilder.build(context)
        const text = RelativeTextDateBuilder.build(previousContext, context) || title
        const dirName = currentFileName.substring(0, currentFileName.indexOf("/index"))
        if (url && url !== dirName) {
          replacement = `<a href="/${url}" title="${title}">${text}</a>`
        } else {
          replacement = `<span class="time" title="${title}">${text}</span>`
        }
      }
    }
    return replacement
  }

  replacement(context: SsgContext, substring: string, timeStr: string): string {
    let parts = timeStr.split("/")
    let replacement: string | undefined
    if (parts.length > 1) {
      const startReplacement = this.valueReplacement(context, parts[0])
      if (startReplacement) {
        const endReplacement = this.valueReplacement(context, parts[1])
        if (endReplacement) {
          replacement = context.messages.context.time.fromTo(startReplacement, endReplacement)
        }
      }
    }
    if (!replacement) {
      replacement = this.valueReplacement(context, timeStr) || substring
    }
    context.debug("\tReplacing", substring, "with", replacement)
    return replacement
  }
}
