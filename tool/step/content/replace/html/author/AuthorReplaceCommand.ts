import {RegexReplacer} from "../../RegexReplacer"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {SsiEchoVarReplaceCommand} from "../ssi/SsiEchoVarCommand"

/**
 * Replaces "<!--#echo var="authors" -->" by the page's <meta name="author">s' content.
 */
export class AuthorReplaceCommand extends SsiEchoVarReplaceCommand {

  constructor() {
    super("authors")
  }

  protected async createReplacer(context: HtmlSsgContext): Promise<RegexReplacer> {
    return {
      replace: (_match: string, ..._args: any[]): string => {
        const fileInfo = context.inputFile
        let authors = fileInfo.authors
        let authorsHtml = ""
        for (const author of authors) {
          authorsHtml += `<span class="people">${author}</span>`
        }
        const copyright = fileInfo.copyright
        if (copyright) {
          authorsHtml += authorsHtml ? ": " + copyright : copyright
        }
        if (authorsHtml) {
          authorsHtml = `<div class="document-author">${authorsHtml}</div>`
        }
        return authorsHtml
      }
    }
  }
}
