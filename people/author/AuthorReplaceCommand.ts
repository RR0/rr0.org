import {RegexReplacer, SsiEchoVarReplaceCommand} from "ssg-api"
import {HtmlRR0SsgContext} from "../../RR0SsgContext"
import {TimeTextBuilder} from "../../time/TimeTextBuilder"

/**
 * Replaces "<!--#echo var="author" -->" and "<!--#echo var="copyright" -->"
 * by the page's <meta name="author">s' content.
 */
export class AuthorReplaceCommand extends SsiEchoVarReplaceCommand {

  constructor() {
    super("author")
  }

  protected async createReplacer(context: HtmlRR0SsgContext): Promise<RegexReplacer> {
    return {
      replace: (_match: string, ..._args: any[]): string => {
        const SsgFile = context.inputFile
        let authors = SsgFile.meta.author
        let authorsHtml = ""
        for (const author of authors) {
          authorsHtml += `<span class="people">${author}</span>`
        }
        const copyright = SsgFile.meta.copyright
        if (copyright) {
          authorsHtml += authorsHtml ? ": " + copyright : copyright
        }
        authorsHtml += ", " + TimeTextBuilder.build(context)
        if (authorsHtml) {
          authorsHtml = `<div class="document-author">${authorsHtml}</div>`
        }
        return authorsHtml
      }
    }
  }
}
