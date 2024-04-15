import { HtmlSsgContext } from "ssg-api"
import { CaseService } from "../science/crypto/ufo/enquete/dossier/CaseService"
import { HtmlRR0SsgContext } from "../RR0SsgContext"

export class AnchorReplacer {

  protected readonly baseUrl: string

  constructor(baseUrl: string, protected caseService: CaseService) {
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
      if (pathToSearch && this.caseService.dirs.find(dir => dir.startsWith(pathToSearch))) {
        const aCase = await this.caseService.read(context, pathToSearch)
        const conclusion = aCase.conclusion
        if (conclusion) {
          a.classList.add(conclusion)
        }
      }
      if (pathname.indexOf(".") < 0 && !pathname.endsWith("/") && !url.hash) {
        a.href += "/"
        context.debug("Added trailing slash in", a.outerHTML)
      }
    }
  }
}
