import {RegexReplacer} from "../../tool/step/content/replace/RegexReplacer"
import {HtmlSsgContext} from "../../tool/HtmlSsgContext"
import {SsiEchoVarReplaceCommand} from "../../tool/step/content/replace/html/ssi/SsiEchoVarCommand"

/**
 * Replaces "<!--#echo var="author" -->" by the page's <meta name="author">s' content.
 */
export class AuthorReplaceCommand extends SsiEchoVarReplaceCommand {

  constructor() {
    super("author")
  }

  protected async createReplacer(context: HtmlSsgContext): Promise<RegexReplacer> {
    return {
      replace: (_match: string, ..._args: any[]): string => {
        const fileInfo = context.inputFile
        let authors = fileInfo.meta.author
        let authorsHtml = ""
        for (const author of authors) {
          authorsHtml += `<span class="people">${author}</span>`
        }
        const copyright = fileInfo.meta.copyright
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
