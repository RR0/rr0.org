import {TimeTextBuilder} from "./TimeTextBuilder"
import {TimeContext} from "./TimeContext"
import {HtmlRR0SsgContext, RR0SsgContextImpl} from "../RR0SsgContext"
import {StringUtil} from "../util/string/StringUtil"

export class Time {

  static readonly timeRegex = /time\/(-)?(\d)\/(\d)\/(\d)\/(\d)\/?(\d{2})?\/?(\d{2})?\/?(index(_[a-z]{2})?.html)?/

  /**
   * Instantiate a Date object matching an ISO date ("1972-08-12 16:34" for instance).
   *
   * Approximated dates like "~1972" will be converted to exact dates ("1972").
   *
   * @param isoDate
   */
  static dateFromIso(isoDate: string): Date {
    isoDate = isoDate.replace("~", "")
    if (isoDate.charAt(0) === "-") {
      isoDate = "-" + "0".repeat(7 - isoDate.length) + isoDate.substring(1)
    }
    return new Date(isoDate)
  }

  static parse(fileName: string): RegExpExecArray | null {
    return Time.timeRegex.exec(fileName)
  }

  static contextFromFile(context: HtmlRR0SsgContext, fileName = context.inputFile.name): TimeContext | undefined {
    let timeContext: TimeContext | undefined
    const timeExec = Time.parse(fileName)
    if (timeExec && timeExec.length > 5) {
      const pageContext = context.clone()
      timeContext = pageContext.time
      const m = parseInt(timeExec[2], 10)
      const c = parseInt(timeExec[3], 10)
      const d = parseInt(timeExec[4], 10)
      const u = parseInt(timeExec[5], 10)
      const year = (timeExec[1] ? -1 : 1) * (m * 1000 + c * 100 + d * 10 + u)
      timeContext.setYear(year)
      const monthStr = timeExec[6]
      timeContext.setMonth(monthStr ? parseInt(monthStr, 10) : undefined)
      const dayStr = timeExec[7]
      timeContext.setDayOfMonth(dayStr ? parseInt(dayStr, 10) : undefined)
    }
    return timeContext
  }

  static titleFromFile(context: HtmlRR0SsgContext, fileName = context.inputFile.name): string | undefined {
    let title: string | undefined
    const timeContext = Time.contextFromFile(context, fileName)
    if (timeContext) {
      const pageContext = new RR0SsgContextImpl(context.locale, timeContext, context.people, context.inputFile)
      title = TimeTextBuilder.build(pageContext)
      title = StringUtil.capitalizeFirstLetter(title)
    }
    return title
  }
}
