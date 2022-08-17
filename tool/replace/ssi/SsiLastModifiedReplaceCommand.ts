import {RegexpReplaceCommand} from "../RegexpReplaceCommand"
import {SsgReplacer} from "../SsgReplacer"
import {SsgContext} from "../../SsgContext"

export class SsiLastModifiedReplaceCommand extends RegexpReplaceCommand {

  constructor() {
    super(/<!--\s*#config timefmt="(.*?)"\s*--><!--\s*#flastmod virtual="\$DOCUMENT_URI"\s*-->/gs)
  }

  protected async createReplacer(context: SsgContext): Promise<SsgReplacer> {
    return {
      replacer: (substring: string, ...args: any[]): string => {
        const timeFormat = args[0]
        const fileInfo = context.fileInfo!
        return fileInfo.lastModified.toLocaleDateString(context.locales, context.options)
      }
    }
  }
}
