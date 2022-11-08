import {HtmlSsgContext} from "../tool/HtmlSsgContext"
import {StringContextHandler} from "../tool/step/content/replace/html/StringContextHandler"
import {Time} from "./Time"

export const timeDefaultHandler: StringContextHandler = (context: HtmlSsgContext): string | undefined => {
  let title: string | undefined
  title = Time.titleFromFile(context)
  return title
}
