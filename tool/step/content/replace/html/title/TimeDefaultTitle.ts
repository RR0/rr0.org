import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {StringContextHandler} from "../StringContextHandler"
import {Time} from "../../../../../model/time/Time"

export const timeDefaultHandler: StringContextHandler = (context: HtmlSsgContext): string | undefined => {
  let title: string | undefined
  title = Time.titleFromFile(context)
  return title
}
