import {RegexReplacer} from "../../RegexReplacer"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {StringContextHandler} from "../StringContextHandler"
import {SsiEchoVarReplaceCommand} from "../ssi/SsiEchoVarCommand"

/**
 * Replaces "<!--#echo var="copyright" -->" by the page's <title> content,
 * with a link if there's a <meta name="url"> content.
 */
export class CopyrightReplaceCommand extends SsiEchoVarReplaceCommand {

  constructor(protected defaultHandlers: StringContextHandler[] = []) {
    super("copyright?")
  }

  protected async createReplacer(context: HtmlSsgContext): Promise<RegexReplacer> {
    return {
      replace: (_match: string, ..._args: any[]): string => {
        const fileInfo = context.inputFile
        let copyrightStr = fileInfo.copyright
        if (!copyrightStr) {
          this.defaultHandlers.some(handle => !copyrightStr && (copyrightStr = handle(context)))
        }
        return copyrightStr || ""
      }
    }
  }
}
