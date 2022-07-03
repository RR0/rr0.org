import {FileInfo} from "../../FileUtil"
import {RegexpReplaceCommand, Replacer} from "../RegexpReplaceCommand"
import {SsgContext} from "../../Ssg"

export class SsiLastModifiedReplaceCommand extends RegexpReplaceCommand {

  constructor() {
    super(/<!--\s*#config timefmt="(.*?)"\s*--><!--\s*#flastmod virtual="\$DOCUMENT_URI"\s*-->/gs)
  }

  protected createReplacer(context: SsgContext, fileInfo: FileInfo): Replacer {
    return (substring: string, ...args: any[]): string => {
      const timeFormat = args[0]
      return fileInfo.lastModified.toLocaleDateString(context.locales, context.options)
    }
  }
}
