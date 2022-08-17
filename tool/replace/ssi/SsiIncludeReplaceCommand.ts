import path from "path"
import {getFileInfo} from "../../FileUtil"
import {RegexpReplaceCommand} from "../RegexpReplaceCommand"
import {SsgReplacer} from "../SsgReplacer"
import {SsgContext} from "../../SsgContext"

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

  protected async createReplacer(context: SsgContext): Promise<SsgReplacer> {
    return this.replacer
  }
}
