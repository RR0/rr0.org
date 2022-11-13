import {TimeTextBuilder} from "./TimeTextBuilder"
import {TimeContext} from "./TimeContext"
import {HtmlRR0SsgContext, RR0SsgContextImpl} from "../RR0SsgContext"
import {StringUtil} from "../util/string/StringUtil"

export class Time {

  static readonly timeRegex = /time\/(\d)\/(\d)\/(\d)\/(\d)\/?(\d{2})?\/?(\d{2})?\/?(index(_[a-z]{2})?.html)?/

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
    if (timeExec && timeExec.length > 4) {
      const pageContext = context.clone()
      timeContext = pageContext.time
      timeContext.setYear(parseInt(timeExec[1], 10) * 1000
        + parseInt(timeExec[2], 10) * 100
        + parseInt(timeExec[3], 10) * 10
        + parseInt(timeExec[4], 10))
      const monthStr = timeExec[5]
      timeContext.setMonth(monthStr ? parseInt(monthStr, 10) : undefined)
      const dayStr = timeExec[6]
      timeContext.setDayOfMonth(dayStr ? parseInt(dayStr, 10) : undefined)
    }
    return timeContext
  }

  static titleFromFile(context: HtmlRR0SsgContext, fileName = context.inputFile.name): string | undefined {
    let title: string | undefined
    const timeContext = Time.contextFromFile(context, fileName)
    if (timeContext) {
      const pageContext = new RR0SsgContextImpl(context.locale, timeContext, context.inputFile)
      title = TimeTextBuilder.build(pageContext)
      title = StringUtil.capitalizeFirstLetter(title)
    }
    return title
  }
}
