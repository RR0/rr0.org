import {HtmlSsgContext} from "ssg-api"

export class AnchorReplacer {

  protected readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/"
  }

  async replacement(context: HtmlSsgContext, a: HTMLAnchorElement): Promise<HTMLAnchorElement> {
    const href = a.href
    const baseUrl = this.baseUrl + context.inputFile.name
    try {
      const url = new URL(href, baseUrl)
      if (href.startsWith("http")) {
        a.target = "_blank"
        context.debug("Adding target in", a.outerHTML)
      } else if (url.protocol.startsWith("http")) {
        const pathname = url.pathname
        if (pathname.indexOf(".") < 0 && !pathname.endsWith("/") && href.indexOf("#") < 0) {
          a.href += "/"
          context.debug("Added trailing slash in", a.outerHTML)
        }
      }
    } catch (e) {
      throw Error(e + ": " + href)
    }
    return a
  }
}
