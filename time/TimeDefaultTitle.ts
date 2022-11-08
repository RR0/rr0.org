import {Time} from "./Time"
import {HtmlRR0SsgContext} from "../RR0SsgContext"
import {StringContextHandler} from "ssg-api"

export const timeDefaultHandler: StringContextHandler = (context: HtmlRR0SsgContext): string | undefined => {
  let title: string | undefined
  title = Time.titleFromFile(context)
  return title
}
