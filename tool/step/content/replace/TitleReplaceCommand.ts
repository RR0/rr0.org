import {RegexpReplaceCommand} from "./RegexpReplaceCommand"
import {SsgReplacer} from "./SsgReplacer"
import {HtmlSsgContext} from "../../../HtmlSsgContext"

export class TitleReplaceCommand extends RegexpReplaceCommand {
  constructor() {
    super(/\$\{title}/)
  }

  protected async createReplacer(context: HtmlSsgContext): Promise<SsgReplacer> {
    return {
      replacer: (_match: string, ..._args: any[]): string => {
        const fileInfo = context.currentFile!
        const title = fileInfo.title
        const titleUrl = fileInfo.titleUrl
        return titleUrl ? `<a href="${titleUrl}" target="_blank">${title}</a>` : title
      }
    }
  }
}
