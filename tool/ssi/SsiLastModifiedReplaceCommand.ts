import {FileInfo} from "../FileUtil"
import {SsiReplaceCommand, SsiReplacer} from "./SsiReplaceCommand"
import {SsgContext} from "../Ssg"

export class SsiLastModifiedReplaceCommand extends SsiReplaceCommand {

  constructor() {
    super(/<!--\s*#config timefmt="(.*?)"\s*--><!--\s*#flastmod virtual="\$DOCUMENT_URI"\s*-->/gs)
  }

  protected createReplacer(context: SsgContext, fileInfo: FileInfo): SsiReplacer {
    return (substring: string, ...args: any[]): string => {
      const timeFormat = args[0]
      return fileInfo.lastModified.toLocaleDateString(context.locales, context.options)
    }
  }
}
