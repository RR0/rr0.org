import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {StringContextHandler} from "../StringContextHandler"

export const rr0DefaultCopyright: StringContextHandler = (context: HtmlSsgContext): string | undefined => {
  const fileInfo = context.currentFile!
  return fileInfo.copyright || "RR0"
}
