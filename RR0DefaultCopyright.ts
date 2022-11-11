import {HtmlSsgContext, StringContextHandler} from "ssg-api"

export const rr0DefaultCopyright: StringContextHandler = (context: HtmlSsgContext): string | undefined => {
  const SsgFile = context.inputFile
  return SsgFile.meta.copyright || `<a href="/GFDL.html">RR0</a>`
}
