import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {TimeTextBuilder} from "../time/TimeTextBuilder"
import {StringUtil} from "../../../../../util/StringUtil"
import {StringContextHandler} from "../StringContextHandler"

export const timeDefaultHandler: StringContextHandler = (context: HtmlSsgContext): string | undefined => {
  let title: string | undefined
  const fileInfo = context.currentFile
  const fileName = fileInfo.name
  const timeRegex = /time\/(\d)\/(\d)\/(\d)\/(\d)\/?(\d{2})?\/?(\d{2})?\/?(index(_[a-z]{2})?.html)?/
  const timeExec = timeRegex.exec(fileName)
  if (timeExec && timeExec.length > 4) {
    const pageContext = context.clone()
    const pageTimeContext = pageContext.time
    pageTimeContext.year = parseInt(timeExec[1], 10) * 1000
      + parseInt(timeExec[2], 10) * 100
      + parseInt(timeExec[3], 10) * 10
      + parseInt(timeExec[4], 10)
    const monthStr = timeExec[5]
    pageTimeContext.month = monthStr ? parseInt(monthStr, 10) : undefined
    const dayStr = timeExec[6]
    pageTimeContext.dayOfMonth = dayStr ? parseInt(dayStr, 10) : undefined
    title = TimeTextBuilder.build(pageContext)
    title = StringUtil.capitalizeFirstLetter(title)
  }
  return title
}
