import {HtmlSsgContext} from "./tool/HtmlSsgContext"
import {StringContextHandler} from "./tool/step/content/replace/html/StringContextHandler"

export const rr0DefaultCopyright: StringContextHandler = (context: HtmlSsgContext): string | undefined => {
  const fileInfo = context.inputFile
  return fileInfo.meta.copyright || `<a href="/GFDL.html">RR0</a>`
}
