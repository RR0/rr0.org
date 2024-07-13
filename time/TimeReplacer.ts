import { HtmlRR0SsgContext, RR0SsgContext } from "../RR0SsgContext"
import { DomReplacement } from "./DomReplacement"
import { ObjectUtils } from "@rr0/common"
import { TimeContext } from "./TimeContext"
import { TimeRenderer, TimeRenderOptions } from "./TimeRenderer"

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
   * @param renderer
   */
  constructor(protected renderer: TimeRenderer) {
  }

  static parseDateTime(timeStr: string): TimeParseResult {
    const dateTimeValues = TimeReplacer.dateTimeRegexp.exec(timeStr)
    if (dateTimeValues && dateTimeValues[0]) {
      const [yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone] = dateTimeValues.slice(1)
      return {yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone}
    }
    return undefined
  }

  static updateTimeFromStr(time: TimeContext, timeStr: string) {
    const result = TimeReplacer.parseDateTime(timeStr)
    if (result) {
      const {yearStr, monthStr, dayOfMonthStr, hour, minutes, timeZone} = result
      time.setYear(parseInt(yearStr, 10))
      if (monthStr) {
        time.setMonth(parseInt(monthStr, 10))
      }
      if (dayOfMonthStr) {
        time.setDayOfMonth(parseInt(dayOfMonthStr, 10))
      }
      if (hour) {
        time.setHour(parseInt(hour, 10))
      }
      if (minutes) {
        time.setMinutes(parseInt(minutes, 10))
      }
      if (timeZone) {
        time.setTimeZone(timeZone)
      }
    }
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

  async replacement(context: HtmlRR0SsgContext, origEl: HTMLTimeElement): Promise<HTMLElement> {
    let replacement: HTMLElement | undefined
    if (origEl.dateTime) {  // Already done?
      replacement = origEl
    } else {
      const previousContext = origEl.dataset["context"] === "none" ? undefined : context.clone()
      const contents = origEl.textContent
      replacement = this.create(context, contents, previousContext)
      if (!replacement) {
        replacement = origEl
        replacement.setAttribute("datetime", context.time.toString())
      }
      context.debug("\tReplacing time", origEl.outerHTML, "with",
        ObjectUtils.asSet<HTMLElement>(replacement).outerHTML)
    }
    return replacement
  }

  static resolvedTime(context: HtmlRR0SsgContext, dateTime: string): HTMLTimeElement {
    const replacement = context.file.document.createElement("time") as HTMLTimeElement
    replacement.dateTime = dateTime
    return replacement
  }

  create(context: HtmlRR0SsgContext, contents: string, previousContext: HtmlRR0SsgContext | undefined,
         options: TimeRenderOptions = {url: true}): HTMLElement | undefined {
    let replacement: HTMLElement | undefined
    const parts = contents.split("/")
    const isTimeInterval = parts.length > 1
    if (isTimeInterval) {
      replacement = this.createInterval(context, previousContext, parts, options, replacement)
    }
    if (!replacement) {
      replacement = this.valueReplacement(context, contents, previousContext, options)
    }
    replacement?.setAttribute("datetime", contents)
    return replacement
  }

  createInterval(context: HtmlRR0SsgContext, previousContext: HtmlRR0SsgContext, parts: string[],
                 options: TimeRenderOptions, replacement: HTMLElement): HTMLElement | undefined {
    const startTime = parts[0]
    const startReplacement = this.valueReplacement(context, startTime, previousContext, options)
    if (startReplacement) {
      const endTime = parts[1]
      const endReplacement = this.valueReplacement(context, endTime, previousContext, options)
      if (endReplacement && endReplacement.outerHTML !== startReplacement.outerHTML) {
        replacement = context.file.document.createElement("span")
        replacement.className = "time-interval"
        replacement.innerHTML = context.messages.context.time.fromTo(startReplacement.outerHTML,
          endReplacement.outerHTML)
      }
    }
    return replacement
  }

  valueReplacement(context: HtmlRR0SsgContext, timeStr: string, previousContext: RR0SsgContext | undefined,
                   options: TimeRenderOptions = {url: true}): HTMLElement | undefined {
    let replacement = undefined
    timeStr = timeStr.trim()
    const time = context.time
    time.approximate = timeStr.charAt(0) === "~"
    if (time.approximate) {
      timeStr = timeStr.substring(1)
    }
    const parsed = TimeReplacer.parseDateTime(timeStr)
    if (parsed) {
      replacement = this.dateTimeReplacement(context, previousContext, parsed, options)
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
        replacement = this.durationReplacement(context, daysStr, hoursStr, minutesStr, secondsStr)
      }
    }
    return replacement
  }

  protected dateTimeReplacement(
    context: HtmlRR0SsgContext, previousContext: RR0SsgContext | null, parsed: TimeParseResult,
    options: TimeRenderOptions = {url: true}
  ): HTMLElement | undefined {
    const time = context.time
    TimeReplacer.setTimeContextFrom(time, parsed)
    let replacement: HTMLElement | undefined = undefined
    if (context.time.isDefined()) {
      replacement = this.renderer.render(context, previousContext, options)
    }
    return replacement
  }

  protected durationReplacement(
    context: HtmlRR0SsgContext, daysStr: string, hoursStr: string, minutesStr: string, secondsStr: string
  ): HTMLTimeElement | undefined {
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
    let replacement: HTMLTimeElement | undefined
    if (items.length > 0) {
      let replacementStr = items.join(", ")
      if (items.length > 1) {
        let last = replacementStr.lastIndexOf(", ")
        replacementStr = replacementStr.substring(0, last) + messages.lastSeparator + items[items.length - 1]
      }
      if (context.time.approximate) {
        replacementStr = messages.approximate(replacementStr)
      }
      replacement = TimeReplacer.resolvedTime(context,
        "T" + (daysStr ? daysStr + "D" : "") + (hoursStr ? hoursStr + "H" : "") + (minutesStr ? minutesStr + "M" : "") + (secondsStr ? secondsStr + "S" : ""))
      replacement.classList.add("duration")
      replacement.textContent = replacementStr
    }
    return replacement
  }
}
