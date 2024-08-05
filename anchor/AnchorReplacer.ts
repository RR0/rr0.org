import { HtmlSsgContext } from "ssg-api"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { AnchorHandler } from "./AnchorHandler"

export class AnchorReplacer {

  protected readonly baseUrl: string

  constructor(baseUrl: string, protected handlers: AnchorHandler[]) {
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/"
  }

  async replacement(context: HtmlRR0SsgContext, a: HTMLAnchorElement): Promise<HTMLAnchorElement> {
    const href = a.href
    const baseUrl = this.baseUrl + context.file.name
    try {
      if (href.startsWith("http") && !href.startsWith(this.baseUrl)) {
        this.updateLinkExternal(context, a)
      } else {
        const url = new URL(href, baseUrl)
        await this.updateLinkInternal(context, a, url)
      }
    } catch (e) {
      throw Error(e + ": " + href)
    }
    return a
  }

  /**
   * Update a link to denote it as external.
   *
   * @param context
   * @param a
   * @protected
   */
  protected updateLinkExternal(context: HtmlSsgContext, a: HTMLAnchorElement) {
    a.target = "_blank"
    a.title = new URL(a.href).host
    context.debug("Adding target in", a.outerHTML)
  }

  protected async updateLinkInternal(context: HtmlRR0SsgContext, a: HTMLAnchorElement, url: URL) {
    if (url.protocol.startsWith("http")) {
      const pathname = url.pathname
      const pathToSearch = pathname.substring(1)
      if (pathToSearch) {
        for (const handler of this.handlers) {
          await handler.handle(context, a, pathToSearch)
        }
      }
      if (pathname.indexOf(".") < 0 && !pathname.endsWith("/") && !url.hash) {
        a.href += "/"
        context.debug("Added trailing slash in", a.outerHTML)
      }
    }
  }
}
