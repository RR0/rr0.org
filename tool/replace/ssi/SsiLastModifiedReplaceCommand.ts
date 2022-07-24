import {FileInfo} from "../../FileUtil"
import {RegexpReplaceCommand} from "../RegexpReplaceCommand"
import {SsgContext} from "../../Ssg"
import {SsgReplacer} from "../SsgReplacer"

export class SsiLastModifiedReplaceCommand extends RegexpReplaceCommand {

  constructor() {
    super(/<!--\s*#config timefmt="(.*?)"\s*--><!--\s*#flastmod virtual="\$DOCUMENT_URI"\s*-->/gs)
  }

  protected createReplacer(context: SsgContext, fileInfo: FileInfo): SsgReplacer {
    return {
      replacer: (substring: string, ...args: any[]): string => {
        const timeFormat = args[0]
        return fileInfo.lastModified.toLocaleDateString(context.locales, context.options)
      }
    }
  }
}
