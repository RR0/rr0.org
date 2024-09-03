import path from "path"
import { RegexReplaceCommand } from "../../RegexReplaceCommand.js"
import { RegexReplacer } from "../../RegexReplacer.js"
import { SsgContext } from "../../../../../SsgContext.js"
import { FileContents } from "../../../../../util/index.js"

/**
 * Replaces SSI's `<!-- #include virtual="myFileName" -->` by fileName's contents.
 */
export class SsiIncludeReplaceCommand extends RegexReplaceCommand {

  constructor() {
    super(/<!--\s*#include\s+virtual="(.+?)"\s*-->/g)
  }

  protected async createReplacer(context: SsgContext): Promise<RegexReplacer> {
    return {
      replace: (_match: string, ...args: any[]): string => {
        let currentDir = process.cwd()
        const toInclude = args[0]
        if (!toInclude.startsWith("/")) {
          const currentFile = context.file
          if (currentFile) {
            const currentFileName = currentFile.name
            const lastSlash = currentFileName.lastIndexOf("/")
            if (lastSlash) {
              currentDir = path.join(process.cwd(), currentFileName.substring(0, lastSlash))
            }
          }
        }
        const fileName = path.join(currentDir, toInclude)
        const replacement = FileContents.read(fileName)
        return replacement.contents
      }
    }
  }
}
