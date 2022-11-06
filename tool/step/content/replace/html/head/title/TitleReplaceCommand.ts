import {RegexReplacer} from "../../../RegexReplacer"
import {HtmlSsgContext} from "../../../../../../HtmlSsgContext"
import {StringContextHandler} from "../../StringContextHandler"
import {SsiEchoVarReplaceCommand} from "../../ssi/SsiEchoVarCommand"

/**
 * Replaces "<!--#echo var="title" -->" by the page's <title> content,
 * with a link if there's a <meta name="url"> content.
 */
export class TitleReplaceCommand extends SsiEchoVarReplaceCommand {

  constructor(protected defaultHandlers: StringContextHandler[] = []) {
    super("title")
  }

  protected async createReplacer(context: HtmlSsgContext): Promise<RegexReplacer> {
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
