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
    const baseUrl = this.baseUrl + context.inputFile.name
    try {
      if (href.startsWith("http")) {
        this.handleExternal(context, a)
      } else {
        const url = new URL(href, baseUrl)
        await this.handleInternal(context, a, url)
      }
    } catch (e) {
      throw Error(e + ": " + href)
    }
    return a
  }

  protected handleExternal(context: HtmlSsgContext, a: HTMLAnchorElement) {
    a.target = "_blank"
    a.title = "Lien externe"
    context.debug("Adding target in", a.outerHTML)
  }

  protected async handleInternal(context: HtmlRR0SsgContext, a: HTMLAnchorElement, url: URL) {
    if (url.protocol.startsWith("http")) {
      const pathname = url.pathname
      const pathToSearch = pathname.substring(1)
      if (pathToSearch) {
        for (const handler of this.handlers) {
          handler.handle(context, a, pathToSearch)
        }
      }
      if (pathname.indexOf(".") < 0 && !pathname.endsWith("/") && !url.hash) {
        a.href += "/"
        context.debug("Added trailing slash in", a.outerHTML)
      }
    }
  }
}
