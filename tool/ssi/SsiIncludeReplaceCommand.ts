import path from "path"
import {FileInfo, getFileInfo} from "../FileUtil"
import {SsiReplaceCommand, SsiReplacer} from "./SsiReplaceCommand"

export class SsiIncludeReplaceCommand extends SsiReplaceCommand {

  constructor() {
    super(/<!--\s*#include\s+virtual="(.+?)"\s*-->/g)
  }

  protected replacer: SsiReplacer = (substring: string, ...args: any[]): string => {
    const fileName = path.join(process.cwd(), args[0])
    const replacement = getFileInfo(fileName)
    return replacement.contents
  }

  protected createReplacer(fileInfo: FileInfo): SsiReplacer {
    return this.replacer
  }
}
