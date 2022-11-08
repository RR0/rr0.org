import {StringContextHandler} from "../tool/step/content/replace/html/StringContextHandler"
import {Time} from "./Time"
import {HtmlRR0SsgContext} from "../RR0SsgContext"

export const timeDefaultHandler: StringContextHandler = (context: HtmlRR0SsgContext): string | undefined => {
  let title: string | undefined
  title = Time.titleFromFile(context)
  return title
}
