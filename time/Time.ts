import { TimeTextBuilder } from "./TimeTextBuilder"
import { TimeContext } from "./TimeContext"
import { HtmlRR0SsgContext, RR0SsgContextImpl } from "../RR0SsgContext"
import { StringUtil } from "../util/string/StringUtil"

export class Time {

  static readonly timePathRegex = /time\/(-)?(\d)\/(\d)\/(\d)\/(\d)\/?(\d{2})?\/?(\d{2})?\/?(index(_[a-z]{2})?.html)?/

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

  static parseFileName(fileName: string): RegExpExecArray | null {
    return Time.timePathRegex.exec(fileName)
  }

  static titleFromFile(context: HtmlRR0SsgContext, fileName: string,
                       timeTextBuilder: TimeTextBuilder): string | undefined {
    let title: string | undefined
    const timeContext = TimeContext.fromFileName(context, fileName)
    if (timeContext) {
      const pageContext = new RR0SsgContextImpl(context.locale, timeContext, context.config, context.people,
        context.file)
      title = timeTextBuilder.build(pageContext)
      title = StringUtil.capitalizeFirstLetter(title)
    }
    return title
  }
}
