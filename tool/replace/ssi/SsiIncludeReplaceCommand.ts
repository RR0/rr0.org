import path from "path"
import {FileInfo, getFileInfo} from "../../FileUtil"
import {RegexpReplaceCommand} from "../RegexpReplaceCommand"
import {SsgContext} from "../../Ssg"
import {SsgReplacer} from "../SsgReplacer"

export class SsiIncludeReplaceCommand extends RegexpReplaceCommand {

  protected readonly replacer: SsgReplacer = {
    replacer: (substring: string, ...args: any[]): string => {
      const fileName = path.join(process.cwd(), args[0])
      const replacement = getFileInfo(fileName)
      return replacement.contents
    }
  }

  constructor() {
    super(/<!--\s*#include\s+virtual="(.+?)"\s*-->/g)
  }

  protected createReplacer(context: SsgContext, fileInfo: FileInfo): SsgReplacer {
    return this.replacer
  }
}
