import {HtmlSsgContext} from "../../HtmlSsgContext"
import {TimeTextBuilder} from "../../step/content/replace/html/time/TimeTextBuilder"
import {StringUtil} from "../../util/StringUtil"
import {TimeContext} from "../../step/content/replace/html/time/TimeContext"
import {SsgContextImpl} from "../../SsgContext"

export class Time {

  static dateFromIso(isoDate: string): Date {
    if (isoDate.charAt(0) === "-") {
      isoDate = "-" + "0".repeat(7 - isoDate.length) + isoDate.substring(1)
    }
    return new Date(isoDate)
  }

  static readonly timeRegex = /time\/(\d)\/(\d)\/(\d)\/(\d)\/?(\d{2})?\/?(\d{2})?\/?(index(_[a-z]{2})?.html)?/

  static parse(fileName: string): RegExpExecArray | null {
    return Time.timeRegex.exec(fileName)
  }

  static contextFromFile(context: HtmlSsgContext, fileName = context.inputFile.name): TimeContext | undefined {
    let timeContext: TimeContext | undefined
    const timeExec = Time.parse(fileName)
    if (timeExec && timeExec.length > 4) {
      const pageContext = context.clone()
      timeContext = pageContext.time
      timeContext.year = parseInt(timeExec[1], 10) * 1000
        + parseInt(timeExec[2], 10) * 100
        + parseInt(timeExec[3], 10) * 10
        + parseInt(timeExec[4], 10)
      const monthStr = timeExec[5]
      timeContext.month = monthStr ? parseInt(monthStr, 10) : undefined
      const dayStr = timeExec[6]
      timeContext.dayOfMonth = dayStr ? parseInt(dayStr, 10) : undefined
    }
    return timeContext
  }

  static titleFromFile(context: HtmlSsgContext, fileName = context.inputFile.name): string | undefined {
    let title: string | undefined
    const timeContext = Time.contextFromFile(context, fileName)
    if (timeContext) {
      const pageContext = new SsgContextImpl(context.locales, timeContext, context.inputFile)
      title = TimeTextBuilder.build(pageContext)
      title = StringUtil.capitalizeFirstLetter(title)
    }
    return title
  }
}
