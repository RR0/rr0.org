import {HtmlSsgContext, StringContextHandler} from "ssg-api"

export const rr0DefaultCopyright: StringContextHandler = (context: HtmlSsgContext): string | undefined => {
  const fileInfo = context.inputFile
  return fileInfo.meta.copyright || `<a href="/GFDL.html">RR0</a>`
}
