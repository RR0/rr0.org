import { RegexReplacer, SsiEchoVarReplaceCommand, StringContextHandler } from "ssg-api"
import { HtmlRR0SsgContext } from "../RR0SsgContext.js"

/**
 * Replaces the SSI expression "<!--#echo var="title" -->" by the page's <title> content,
 * with a link if there's a <meta name="url"> content.
 */
export class SsiTitleReplaceCommand extends SsiEchoVarReplaceCommand {

  constructor(protected defaultHandlers: StringContextHandler[] = []) {
    super("title")
  }

  protected async createReplacer(context: HtmlRR0SsgContext): Promise<RegexReplacer> {
    return {
      replace: (_match: string, ..._args: any[]): string => {
        const inputFile = context.file
        let title = inputFile.title
        if (!title) {
          this.defaultHandlers.some(handle => !title && (title = handle(context)))
        }
        if (!title) {
          title = inputFile.name
        }
        inputFile.title = title
        const titleUrl = inputFile.meta.url
        return titleUrl ? `<a href="${titleUrl}" target="_blank">${title}</a>` : title
      }
    }
  }
}
