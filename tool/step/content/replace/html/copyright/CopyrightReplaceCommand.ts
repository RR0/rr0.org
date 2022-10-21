import {RegexpReplaceCommand} from "../../RegexpReplaceCommand"
import {SsgReplacer} from "../../SsgReplacer"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {StringContextHandler} from "../StringContextHandler"

/**
 * Replaces "${title}" by the page's <title> content,
 * with a link if there's a <meta name="url"> content.
 */
export class CopyrightReplaceCommand extends RegexpReplaceCommand {

  constructor(protected defaultHandlers: StringContextHandler[] = []) {
    super(/\$\{copyright}/)
  }

  protected async createReplacer(context: HtmlSsgContext): Promise<SsgReplacer> {
    return {
      replacer: (_match: string, ..._args: any[]): string => {
        const fileInfo = context.currentFile!
        let copyright = fileInfo.copyright
        if (!copyright) {
          this.defaultHandlers.some(handle => !copyright && (copyright = handle(context)))
        }
        if (copyright) {
          fileInfo.copyright = copyright
        } else {
          copyright = ""
        }
        return copyright
      }
    }
  }
}
