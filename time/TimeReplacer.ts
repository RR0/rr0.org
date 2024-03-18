import { TimeUrlBuilder } from "./TimeUrlBuilder"
import { TimeTextBuilder } from "./TimeTextBuilder"
import { RelativeTimeTextBuilder } from "./RelativeTimeTextBuilder"
import { HtmlRR0SsgContext, RR0SsgContext } from "../RR0SsgContext"
import { UrlUtil } from "../util/url/UrlUtil"
import { DomReplacement } from "./DomReplacement"
import { ObjectUtils } from "@rr0/common"
import { TimeContext } from "./TimeContext"

export type TimeParseResult = {
  yearStr: string
  monthStr: string
  dayOfMonthStr: string
  hour: string
  minutes: string
  timeZone: string
}

/**
 * Replaces a <time> tag.
 */
export class TimeReplacer implements DomReplacement<HtmlRR0SsgContext, HTMLTimeElement> {

  static readonly dateTimeRegexp = new RegExp(
    "^(-?\\d{3,})?(?:-?([0-1]\\d)(?!\:))?(?:-?([0-3]\\d{1,2}(?!\:)))?(?:[T ]?(?:([0-2]\\d):([0-5]\\d))?)?(?: ?([A-Z]{3}))?"
  )
  static readonly durationRegexp = new RegExp("P(:?(\\d+)D)?(:?(\\d+)H)?(:?(\\d+)M)?(:?(\\d+)S)?")

  /**
   * @param timeFiles The existing time files that we can link to (i.e. we won't link to non-existing ones).
   */
  constructor(protected timeFiles: string[]) {
  }

  static parseDateTime(timeStr: string): TimeParseResult {
    const dateTimeValues = TimeReplacer.dateTimeRegexp.exec(timeStr)
    if (dateTimeValues && dateTimeValues[0]) {
      const [yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone] = dateTimeValues.slice(1)
      return {yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone}
    }
    return undefined
  }

  static replaceElement(
    context: HtmlRR0SsgContext, approximate: boolean, timeFiles: string[], previousContext?: RR0SsgContext
  ): HTMLElement {
    let replacement: HTMLElement | undefined
    const absoluteTimeStr = TimeUrlBuilder.fromContext(context)
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
    const currentFileName = context.inputFile.name
    const dirName = currentFileName.substring(0, currentFileName.indexOf("/index"))
    const url = TimeReplacer.matchExistingTimeFile(absoluteTimeStr, timeFiles)
    if (url && url !== dirName) {
      const a = replacement = context.outputFile.document.createElement("a") as HTMLAnchorElement
      a.href = UrlUtil.absolute(url)
    } else {
      replacement = context.outputFile.document.createElement("time")
    }
    if (text != title) {
      replacement.title = title
    }
    replacement.textContent = text
    return replacement
  }

  static setTimeContextFrom(timeContext: TimeContext, parsed: TimeParseResult) {
    if (parsed.yearStr) {
      const year = parseInt(parsed.yearStr, 10)
      if (!Number.isNaN(year)) {
        timeContext.setYear(year)
      }
    }
    if (parsed.monthStr) {
      const month = parseInt(parsed.monthStr, 10)
      if (!Number.isNaN(month)) {
        timeContext.setMonth(month)
      }
    }
    if (parsed.dayOfMonthStr) {
      const dayOfMonth = parseInt(parsed.dayOfMonthStr, 10)
      if (!Number.isNaN(dayOfMonth)) {
        timeContext.setDayOfMonth(dayOfMonth)
      }
    }
    if (parsed.hour) {
      timeContext.setHour(parseInt(parsed.hour, 10))
    }
    if (parsed.minutes) {
      timeContext.setMinutes(parseInt(parsed.minutes, 10))
    }
    if (parsed.timeZone) {
      timeContext.setTimeZone(parsed.timeZone)
    }
  }

  async replacement(context: HtmlRR0SsgContext, original: HTMLTimeElement): Promise<HTMLElement> {
    let replacement: HTMLElement | undefined
    if (original.dateTime) {  // Already done?
      replacement = original
    } else {
      const previousContext = original.dataset["context"] === "none" ? undefined : context.clone()
      const contents = original.textContent
      const parts = contents.split("/")
      const isTimeInterval = parts.length > 1
      if (isTimeInterval) {
        const startTime = parts[0]
        const startReplacement = this.valueReplacement(context, startTime, previousContext)
        if (startReplacement) {
          const endTime = parts[1]
          const endReplacement = this.valueReplacement(context, endTime, previousContext)
          if (endReplacement) {
            replacement = context.outputFile.document.createElement("span")
            replacement.className = "time-interval"
            replacement.innerHTML = context.messages.context.time.fromTo(startReplacement.outerHTML,
              endReplacement.outerHTML)
          }
        }
      }
      if (!replacement) {
        replacement = this.valueReplacement(context, contents, previousContext) || original
      }
      context.debug("\tReplacing time", original.outerHTML, "with",
        ObjectUtils.asSet<HTMLElement>(replacement).outerHTML)
      replacement.setAttribute("datetime", contents)
    }
    return replacement
  }

  protected static matchExistingTimeFile(url: string, timeFiles: string[]): string | undefined {
    while (url !== "time" && timeFiles.indexOf(`${url}/index.html`) < 0) {
      const slash = url.lastIndexOf("/")
      url = url.substring(0, slash)
    }
    return url === "time" ? undefined : url
  }

  valueReplacement(context: HtmlRR0SsgContext, timeStr: string,
                   previousContext: RR0SsgContext | undefined): HTMLElement | undefined {
    let replacement = undefined
    timeStr = timeStr.trim()
    const approximate = timeStr.charAt(0) === "~"
    if (approximate) {
      timeStr = timeStr.substring(1)
    }
    const parsed = TimeReplacer.parseDateTime(timeStr)
    if (parsed) {
      replacement = this.dateTimeReplacement(context, previousContext, parsed, approximate)
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

  protected dateTimeReplacement(
    context: HtmlRR0SsgContext, previousContext: RR0SsgContext | null, parsed: TimeParseResult, approximate: boolean
  ): HTMLElement | undefined {
    const timeContext = context.time
    TimeReplacer.setTimeContextFrom(timeContext, parsed)
    let replacement: HTMLElement | undefined = undefined
    if (context.time.isDefined()) {
      replacement = TimeReplacer.replaceElement(context, approximate, this.timeFiles, previousContext)
    }
    return replacement
  }

  protected durationReplacement(
    context: HtmlRR0SsgContext, daysStr: string, hoursStr: string, minutesStr: string, secondsStr: string,
    approximate: boolean
  ): HTMLElement | undefined {
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
    let replacement: HTMLElement | undefined
    if (items.length > 0) {
      let replacementStr = items.join(", ")
      if (items.length > 1) {
        let last = replacementStr.lastIndexOf(", ")
        replacementStr = replacementStr.substring(0, last) + messages.lastSeparator + items[items.length - 1]
      }
      if (approximate) {
        replacementStr = messages.approximate(replacementStr)
      }
      replacement = context.outputFile.document.createElement("time")
      replacement.className = "duration"
      replacement.textContent = replacementStr
    }
    return replacement
  }
}
