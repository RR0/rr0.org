import { HtmlRR0SsgContext, RR0SsgContext } from "../RR0SsgContext"
import { TimeRenderer, TimeRenderOptions } from "./TimeRenderer"
import { TimeReplacer } from "./TimeReplacer"
import { TimeContext } from "./TimeContext"

/**
 * Creates <time> elements from time strings.
 */
export class TimeElementFactory {

  constructor(readonly renderer: TimeRenderer) {
  }

  create(context: HtmlRR0SsgContext, previousContext: HtmlRR0SsgContext | undefined,
         options: TimeRenderOptions = {url: true}): HTMLElement | undefined {
    let replacement: HTMLElement | undefined
    const time = context.time
    if (time.from) {
      const fromContext = context.clone()
      fromContext.time = time.from
      if (time.to) {
        const toContext = context.clone()
        toContext.time = time.to
        replacement = this.createInterval(fromContext, toContext, previousContext, options)
      } else {
        replacement = this.createStarting(fromContext, previousContext, options)
      }
    }
    if (!replacement) {
      replacement = this.valueReplacement(context, previousContext, options)
    }
    return replacement
  }

  createInterval(fromContext: HtmlRR0SsgContext, toContext: HtmlRR0SsgContext, previousContext: HtmlRR0SsgContext,
                 options: TimeRenderOptions): HTMLElement | undefined {
    let replacement: HTMLElement
    const startReplacement = this.valueReplacement(fromContext, previousContext, options)
    if (startReplacement) {
      const endReplacement = this.valueReplacement(toContext, previousContext, options)
      if (endReplacement && endReplacement.outerHTML !== startReplacement.outerHTML) {
        replacement = fromContext.file.document.createElement("span")
        replacement.className = "time-interval"
        replacement.innerHTML = fromContext.messages.context.time.fromTo(startReplacement.outerHTML,
          endReplacement.outerHTML)
      }
    }
    return replacement
  }

  createStarting(fromContext: HtmlRR0SsgContext, previousContext: HtmlRR0SsgContext,
                 options: TimeRenderOptions): HTMLElement | undefined {
    const {result, replacement} = this.renderer.renderContent(fromContext, previousContext, options)
    let startingReplacement: HTMLElement
    startingReplacement = fromContext.file.document.createElement("span")
    startingReplacement.className = "time-interval"
    const approximate = !fromContext.time.getDayOfMonth()
    startingReplacement.innerHTML = fromContext.messages.context.time.starting(approximate) + " " + result.outerHTML
    result.append(startingReplacement, replacement)
    return result
  }

  valueReplacement(context: HtmlRR0SsgContext, previousContext: RR0SsgContext | undefined,
                   options: TimeRenderOptions = {url: true}): HTMLElement | undefined {
    let replacement
    if (context.time.duration) {
      replacement = this.durationReplacement(context)
    } else {
      replacement = this.dateTimeReplacement(context, previousContext, options)
    }
    return replacement
  }

  protected durationReplacement(context: HtmlRR0SsgContext): HTMLTimeElement | undefined {
    const items = []
    let duration = context.time.duration
    const messages = context.messages.context.time.duration
    let datetime = "P"
    const days = Math.floor(duration / TimeContext.DAY)
    if (days > 0) {
      items.push(messages.days(days))
      datetime += days + "D"
    }
    duration %= TimeContext.DAY
    const hours = Math.floor(duration / TimeContext.HOUR)
    if (hours > 0) {
      items.push(messages.hours(hours))
      datetime += hours + "H"
    }
    duration %= TimeContext.HOUR
    const minutes = Math.floor(duration / TimeContext.MINUTE)
    if (minutes > 0) {
      items.push(messages.minutes(minutes))
      datetime += minutes + "M"
    }
    duration %= TimeContext.MINUTE
    if (duration > 0) {
      items.push(messages.seconds(duration))
      datetime += duration + "S"
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
      replacement = TimeReplacer.resolvedTime(context, datetime)
      replacement.classList.add("duration")
      replacement.textContent = replacementStr
    }
    return replacement
  }

  protected dateTimeReplacement(
    context: HtmlRR0SsgContext, previousContext: RR0SsgContext | null, options: TimeRenderOptions = {url: true}
  ): HTMLElement | undefined {
    let replacement: HTMLElement | undefined = undefined
    if (context.time.isDefined()) {
      replacement = this.renderer.render(context, previousContext, options)
    }
    return replacement
  }

}
