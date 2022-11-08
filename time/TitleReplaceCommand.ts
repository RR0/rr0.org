import {SsiEchoVarReplaceCommand} from "../tool/step/content/replace/html/ssi/SsiEchoVarCommand"
import {RegexReplacer} from "../tool/step/content/replace/RegexReplacer"
import {StringContextHandler} from "../tool/step/content/replace/html/StringContextHandler"
import {HtmlRR0SsgContext} from "../RR0SsgContext"

/**
 * Replaces "<!--#echo var="title" -->" by the page's <title> content,
 * with a link if there's a <meta name="url"> content.
 */
export class TitleReplaceCommand extends SsiEchoVarReplaceCommand {

  constructor(protected defaultHandlers: StringContextHandler[] = []) {
    super("title")
  }

  protected async createReplacer(context: HtmlRR0SsgContext): Promise<RegexReplacer> {
    return {
      replace: (_match: string, ..._args: any[]): string => {
        const fileInfo = context.inputFile
        let title = fileInfo.title
        if (!title) {
          this.defaultHandlers.some(handle => !title && (title = handle(context)))
        }
        if (!title) {
          title = fileInfo.name
        }
        fileInfo.title = title
        const titleUrl = fileInfo.meta.url
        return titleUrl ? `<a href="${titleUrl}" target="_blank">${title}</a>` : title
      }
    }
  }
}
