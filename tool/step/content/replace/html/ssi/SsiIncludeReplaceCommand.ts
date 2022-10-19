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
      replacer: (match: string, ...args: any[]): string => {
        let currentDir = process.cwd()
        const toInclude = args[0]
        if (!toInclude.startsWith("/")) {
          const currentFile = context.currentFile
          if (currentFile) {
            const currentFileName = currentFile.name
            const lastSlash = currentFileName.lastIndexOf("/")
            if (lastSlash) {
              currentDir = path.join(process.cwd(), currentFileName.substring(0, lastSlash))
            }
          }
        }
        const fileName = path.join(currentDir, toInclude)
        const replacement = getFileInfo(context, fileName)
        return replacement.contents
      }
    }
  }
}
