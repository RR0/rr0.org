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
        let authorsHtml = authors.map(author => `<span class="people">${author}</span>`).join(" & ")
        const copyright = file.meta.copyright
        if (copyright) {
          authorsHtml += authorsHtml ? ": " + copyright : copyright
        }
        if (authorsHtml && context.time.getYear()) {
          const {result, replacement} = this.timeService.renderer.renderContent(context, undefined, {url: true})
          result.append(replacement)
          authorsHtml += ", " + result.outerHTML
        }
        if (authorsHtml) {
          authorsHtml = `<div class="document-author">${authorsHtml}</div>`
        }
        return authorsHtml
      }
    }
  }
}
