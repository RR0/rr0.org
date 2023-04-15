import {TimeUrlBuilder} from "./TimeUrlBuilder"
import {TimeTextBuilder} from "./TimeTextBuilder"
import {RelativeTimeTextBuilder} from "./RelativeTimeTextBuilder"
import {HtmlRR0SsgContext, RR0SsgContext} from "../RR0SsgContext"
import {UrlUtil} from "../util/url/UrlUtil"
import {DomReplacement} from "./DomReplacement"
import {ObjectUtils} from "@rr0/common"

export class TimeReplacer implements DomReplacement<HtmlRR0SsgContext> {

  static readonly dateTimeRegexp = new RegExp(
    "^(-?\\d{3,})?(?:-?([0-1]\\d)(?!\:))?(?:-?([0-3]\\d{1,2}(?!\:)))?(?:[T ]?(?:([0-2]\\d):([0-5]\\d))?)?(?: ?([A-Z]{3}))?")
  static readonly durationRegexp = new RegExp("P(:?(\\d+)D)?(:?(\\d+)H)?(:?(\\d+)M)?(:?(\\d+)S)?")

  /**
   *
   * @param timeFiles The existing time files that we can link to (i.e. we won't link to non-existing ones).
   */
  constructor(protected timeFiles: string[]) {
  }

  valueReplacement(context: HtmlRR0SsgContext, timeStr: string, noContext = false): HTMLElement | undefined {
    let replacement = undefined
    timeStr = timeStr.trim()
    const approximate = timeStr.charAt(0) === "~"
    if (approximate) {
      timeStr = timeStr.substring(1)
    }
    const dateTimeValues = TimeReplacer.dateTimeRegexp.exec(timeStr)
    if (dateTimeValues && dateTimeValues[0]) {
      const [yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone] = dateTimeValues.slice(1)
      const previousContext: RR0SsgContext | null = noContext ? null : context.clone()
      replacement = this.dateTimeReplacement(context, previousContext, yearStr, monthStr, dayOfMonthStr, hour, minutes,
        timeZone, approximate)
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

  async replacement(context: HtmlRR0SsgContext, original: HTMLElement): Promise<HTMLElement> {
    const noContext = original.dataset["context"] === "none"
    const contents = original.textContent
    const parts = contents.split("/")
    let replacement: HTMLElement | undefined
    const isTimeInterval = parts.length > 1
    if (isTimeInterval) {
      const startTime = parts[0]
      const startReplacement = this.valueReplacement(context, startTime, noContext)
      if (startReplacement) {
        const endTime = parts[1]
        const endReplacement = this.valueReplacement(context, endTime, noContext)
        if (endReplacement) {
          replacement = context.outputFile.document.createElement("span")
          replacement.className = "time-interval"
          replacement.innerHTML = context.messages.context.time.fromTo(startReplacement.outerHTML,
            endReplacement.outerHTML)
        }
      }
    }
    if (!replacement) {
      replacement = this.valueReplacement(context, contents, noContext) || original
    }
    context.debug("\tReplacing time", original.outerHTML, "with", ObjectUtils.asSet<HTMLElement>(replacement).outerHTML)
    return replacement
  }

  private dateTimeReplacement(context: HtmlRR0SsgContext, previousContext: RR0SsgContext | null, yearStr: string,
                              monthStr: string, dayOfMonthStr: string, hour: string, minutes: string, timeZone: string,
                              approximate: boolean): HTMLElement | undefined {
    let replacement: HTMLElement | undefined = undefined
    const timeContext = context.time
    if (yearStr) {
      const year = parseInt(yearStr, 10)
      if (!Number.isNaN(year)) {
        timeContext.setYear(year)
      }
    }
    if (monthStr) {
      const month = parseInt(monthStr, 10)
      if (!Number.isNaN(month)) {
        timeContext.setMonth(month)
      }
    }
    if (dayOfMonthStr) {
      const dayOfMonth = parseInt(dayOfMonthStr, 10)
      if (!Number.isNaN(dayOfMonth)) {
        timeContext.setDayOfMonth(dayOfMonth)
      }
    }
    if (hour) {
      timeContext.setHour(parseInt(hour, 10))
    }
    if (minutes) {
      timeContext.setMinutes(parseInt(minutes, 10))
    }
    if (timeZone) {
      timeContext.setTimeZone(timeZone)
    }
    if (timeContext.isDefined()) {
      const absoluteTimeStr = TimeUrlBuilder.build(context)
      const url = this.matchExistingTimeFile(absoluteTimeStr)
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
      if (url && url !== dirName) {
        const a = replacement = context.outputFile.document.createElement("a") as HTMLAnchorElement
        a.href = UrlUtil.absolute(url)
        if (text != title) {
          replacement.title = title
        }
      } else {
        const span = replacement = context.outputFile.document.createElement("span")
        span.className = "time"
      }
      replacement.textContent = text
    }
    return replacement
  }

  private matchExistingTimeFile(url: string): string | undefined {
    while (url !== "time" && this.timeFiles.indexOf(`${url}/index.html`) < 0) {
      const slash = url.lastIndexOf("/")
      url = url.substring(0, slash)
    }
    return url === "time" ? undefined : url
  }

  private durationReplacement(context: HtmlRR0SsgContext, daysStr: string, hoursStr: string, minutesStr: string,
                              secondsStr: string, approximate: boolean): HTMLElement | undefined {
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
      let replacementStr
      replacementStr = items.join(", ")
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
