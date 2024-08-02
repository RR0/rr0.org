import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { DomReplacement } from "./DomReplacement"
import { ObjectUtils } from "@rr0/common"
import { TimeElementFactory } from "./TimeElementFactory"

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
   * @param factory
   */
  constructor(readonly factory: TimeElementFactory) {
  }

  async replacement(context: HtmlRR0SsgContext, origEl: HTMLTimeElement): Promise<HTMLElement> {
    let replacement: HTMLElement | undefined
    if (origEl.dateTime) {  // Already done?
      replacement = origEl
    } else {
      const previousContext = origEl.dataset["context"] === "none" ? undefined : context.clone()
      const timeStr = origEl.textContent
      replacement = this.factory.create(context, timeStr, previousContext)
      if (!replacement) {
        replacement = origEl
        replacement.setAttribute("datetime", context.time.toString())
      }
      context.debug("\tReplacing time", origEl.outerHTML, "with", ObjectUtils.asSet<HTMLElement>(replacement).outerHTML)
    }
    return replacement
  }

  static resolvedTime(context: HtmlRR0SsgContext, dateTime: string): HTMLTimeElement {
    const replacement = context.file.document.createElement("time") as HTMLTimeElement
    replacement.dateTime = dateTime
    return replacement
  }
}
