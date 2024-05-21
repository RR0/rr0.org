import { HtmlSsgContext, StringContextHandler } from "ssg-api"

export const rr0DefaultCopyright: StringContextHandler = (context: HtmlSsgContext): string | undefined => {
  return context.file.meta.copyright || `<a href="/GFDL.html">RR0</a>`
}
