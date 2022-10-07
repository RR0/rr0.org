import path from "path"
import {RegexpReplaceCommand} from "../../RegexpReplaceCommand"
import {SsgReplacer} from "../../SsgReplacer"
import {SsgContext} from "../../../../../SsgContext"
import {getFileInfo} from "../../../../../util/file/FileInfo"

export class SsiIncludeReplaceCommand extends RegexpReplaceCommand {

  constructor() {
    super(/<!--\s*#include\s+virtual="(.+?)"\s*-->/g)
  }

  protected async createReplacer(context: SsgContext): Promise<SsgReplacer> {
    return {
      replacer: (substring: string, ...args: any[]): string => {
        const fileName = path.join(process.cwd(), args[0])
        const replacement = getFileInfo(context, fileName)
        return replacement.contents
      }
    }
  }
}
