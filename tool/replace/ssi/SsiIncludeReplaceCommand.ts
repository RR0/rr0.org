import path from "path"
import {FileInfo, getFileInfo} from "../../FileUtil"
import {RegexpReplaceCommand, Replacer} from "../RegexpReplaceCommand"
import {SsgContext} from "../../Ssg"

export class SsiIncludeReplaceCommand extends RegexpReplaceCommand {

  constructor() {
    super(/<!--\s*#include\s+virtual="(.+?)"\s*-->/g)
  }

  protected replacer: Replacer = (substring: string, ...args: any[]): string => {
    const fileName = path.join(process.cwd(), args[0])
    const replacement = getFileInfo(fileName)
    return replacement.contents
  }

  protected createReplacer(context: SsgContext, fileInfo: FileInfo): Replacer {
    return this.replacer
  }
}
