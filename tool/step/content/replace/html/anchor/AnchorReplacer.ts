import {HtmlSsgContext} from "../../../../../HtmlSsgContext"

export class AnchorReplacer {

  constructor(protected baseUrl: string) {
  }

  async replacement(context: HtmlSsgContext, a: HTMLAnchorElement): Promise<HTMLAnchorElement> {
    const href = a.href
    const baseUrl = this.baseUrl + context.inputFile.name
    const url = new URL(href, baseUrl)
    if (href.startsWith("https://")) {
      a.target = "_blank"
      context.debug("Adding target in", a.outerHTML)
    }
    const pathname = url.pathname
    if (url.protocol.startsWith("http") && pathname.indexOf(".") < 0 && !pathname.endsWith("/")) {
      a.href += "/"
      context.debug("Adding traling slash in", a.outerHTML)
    }
    return a
  }
}
