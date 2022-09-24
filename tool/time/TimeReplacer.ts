import {SsgContext} from "../SsgContext"
import {TimeUrlBuilder} from "./TimeUrlBuilder"
import {TimeTextBuilder} from "./TimeTextBuilder"
import {RelativeTimeTextBuilder} from "./RelativeTimeTextBuilder"
import {UrlUtil} from "../util/url/UrlUtil"

export class TimeReplacer {

  static readonly dateTimeRegexp = new RegExp("^(-?\\d{3,})?(?:-?([0-1]\\d))?(?:-?([0-3]\\d{1,2}))?(?:[T ]?(?:([0-2]\\d):([0-5]\\d))?)?(?: ?([A-Z]{3}))?")
  static readonly durationRegexp = new RegExp("P(:?(\\d+)D)?(:?(\\d+)H)?(:?(\\d+)M)?(:?(\\d+)S)?")

  /**
   *
   * @param timeFiles The existing time files that we can link to (i.e. we won't link to non-existing ones).
   */
  constructor(protected timeFiles: string[]) {
  }

  valueReplacement(context: SsgContext, timeStr: string, noContext = false): string | undefined {
    let replacement = undefined
    timeStr = timeStr.trim()
    const approximate = timeStr.charAt(0) === "~"
    if (approximate) {
      timeStr = timeStr.substring(1)
    }
    const dateTimeValues = TimeReplacer.dateTimeRegexp.exec(timeStr)
    if (dateTimeValues && dateTimeValues[0]) {
      const [yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone] = dateTimeValues.slice(1)
      const previousContext: SsgContext | null = noContext ? null : context.clone()
      replacement = this.dateTimeReplacement(context, previousContext, yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone, approximate)
    } else {
      const durationValues = TimeReplacer.durationRegexp.exec(timeStr)
      if (durationValues && durationValues[0]) {
        const map = durationValues.slice(1)
        const [daysStr, hoursStr, minutesStr, secondsStr] = map.reduce((reduced: string[], current: string, i) => {
          if (i % 2 !== 0) {
            reduced.push(current)
          }
          return reduced
        }, [])
        replacement = this.durationReplacement(context, daysStr, hoursStr, minutesStr, secondsStr, approximate)
      }
    }
    return replacement
  }

  replacement(context: SsgContext, match: string, contents: string): string {
    const noContext = match.indexOf(`data-context="none"`) >= 0
    const parts = contents.split("/")
    let replacement: string | undefined
    if (parts.length > 1) {
      const startReplacement = this.valueReplacement(context, parts[0], noContext)
      if (startReplacement) {
        const endReplacement = this.valueReplacement(context, parts[1], noContext)
        if (endReplacement) {
          replacement = context.messages.context.time.fromTo(startReplacement, endReplacement)
        }
      }
    }
    if (!replacement) {
      replacement = this.valueReplacement(context, contents, noContext) || match
    }
    context.debug("\tReplacing time", match, "with", replacement)
    return replacement
  }

  private dateTimeReplacement(context: SsgContext, previousContext: SsgContext | null, yearStr: string, monthStr: string, dayOfMonthStr: string, hour: string, minutes: string, timeZone: string, approximate: boolean): string | undefined {
    let replacement: string | undefined = undefined
    const timeContext = context.time
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
      let url = TimeUrlBuilder.build(context)
      while (url !== "time" && this.timeFiles.indexOf(url) < 0) {
        const slash = url.lastIndexOf("/")
        url = url.substring(0, slash)
      }
      let title = TimeTextBuilder.build(context)
      if (approximate) {
        title = context.messages.context.time.approximate(title)
      }
      let text = previousContext ? RelativeTimeTextBuilder.build(previousContext, context) : undefined
      if (text) {
        if (approximate) {
          text = context.messages.context.time.approximate(text)
        }
      } else {
        text = title
      }
      const titleAttr = text != title ? ` title="${title}"` : ""
      const currentFileName = context.currentFile?.name!
      const dirName = currentFileName.substring(0, currentFileName.indexOf("/index"))
      if (url && url !== dirName) {
        replacement = `<a href="${UrlUtil.absolute(url)}"${titleAttr}>${text}</a>`
      } else {
        replacement = `<span class="time"${titleAttr}>${text}</span>`
      }
    }
    return replacement
  }

  private durationReplacement(context: SsgContext, daysStr: string, hoursStr: string, minutesStr: string, secondsStr: string, approximate: boolean): string | undefined {
    const items = []
    const messages = context.messages.context.time.duration
    if (daysStr) {
      const days = parseInt(daysStr, 10)
      items.push(messages.days(days))
    }
    if (hoursStr) {
      const hours = parseInt(hoursStr, 10)
      items.push(messages.hours(hours))
    }
    if (minutesStr) {
      const minutes = parseInt(minutesStr, 10)
      items.push(messages.minutes(minutes))
    }
    if (secondsStr) {
      const seconds = parseInt(secondsStr, 10)
      items.push(messages.seconds(seconds))
    }
    let replacement
    if (items.length > 0) {
      replacement = items.join(", ")
      if (items.length > 1) {
        let last = replacement.lastIndexOf(", ")
        replacement = replacement.substring(0, last) + messages.lastSeparator + items[items.length - 1]
      }
      if (approximate) {
        replacement = messages.approximate(replacement)
      }
      replacement = `<time class="duration">${replacement}</time>`
    }
    return replacement
  }
}
