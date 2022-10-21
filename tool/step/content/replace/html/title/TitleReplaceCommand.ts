import {RegexpReplaceCommand} from "../../RegexpReplaceCommand"
import {SsgReplacer} from "../../SsgReplacer"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {StringContextHandler} from "../StringContextHandler"

/**
 * Replaces "${title}" by the page's <title> content,
 * with a link if there's a <meta name="url"> content.
 */
export class TitleReplaceCommand extends RegexpReplaceCommand {

  constructor(protected defaultHandlers: StringContextHandler[] = []) {
    super(/\$\{title}/)
  }

  protected async createReplacer(context: HtmlSsgContext): Promise<SsgReplacer> {
    return {
      replacer: (_match: string, ..._args: any[]): string => {
        const fileInfo = context.currentFile!
        let title = fileInfo.title
        if (!title) {
          this.defaultHandlers.some(handle => !title && (title = handle(context)))
        }
        if (!title) {
          title = fileInfo.name
        }
        fileInfo.title = title
        const titleUrl = fileInfo.titleUrl
        return titleUrl ? `<a href="${titleUrl}" target="_blank">${title}</a>` : title
      }
    }
  }
}
