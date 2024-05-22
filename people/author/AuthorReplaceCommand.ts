import { RegexReplacer, SsiEchoVarReplaceCommand } from "ssg-api"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { TimeService } from "../../time/TimeService"

/**
 * Replaces "<!--#echo var="author" -->" and "<!--#echo var="copyright" -->"
 * by the page's <meta name="author">s' content.
 */
export class AuthorReplaceCommand extends SsiEchoVarReplaceCommand {

  constructor(protected timeService: TimeService) {
    super("author")
  }

  protected async createReplacer(context: HtmlRR0SsgContext): Promise<RegexReplacer> {
    return {
      replace: (_match: string, ..._args: any[]): string => {
        const file = context.file
        let authors = file.meta.author
        let authorsHtml = ""
        for (const author of authors) {
          authorsHtml += `<span class="people">${author}</span>`
        }
        const copyright = file.meta.copyright
        if (copyright) {
          authorsHtml += authorsHtml ? ": " + copyright : copyright
        }
        if (authorsHtml && context.time.getYear()) {
          const timeElem = this.timeService.renderer.render(context)
          authorsHtml += ", " + timeElem.outerHTML
        }
        if (authorsHtml) {
          authorsHtml = `<div class="document-author">${authorsHtml}</div>`
        }
        return authorsHtml
      }
    }
  }
}
