import {ReplaceCommand} from "../ReplaceCommand"
import {FileInfo} from "../../../../util/file/FileInfo"
import {SsgContext} from "../../../../SsgContext"

enum HtAccessCommands {
  Options = "Options",
  AddOutputFilterByType = "AddOutputFilterByType",
  AddType = "AddType",
  AddHandler = "AddHandler",
  IndexIgnore = "IndexIgnore",
  HeaderName = "HeaderName",
  IndexOptions = "IndexOptions",
  DirectoryIndex = "DirectoryIndex",
  Redirect = "Redirect",
  ErrorDocument = "ErrorDocument",
}

export abstract class HtAccessReplaceCommand implements ReplaceCommand {

  async execute(context: SsgContext): Promise<FileInfo> {
    const inputFileInfo = context.inputFile
    const contents = inputFileInfo.contents
    const lines = contents.split("\n").map(line => line.trim())
    let result = ""
    for (const line of lines) {
      const args = line.split(" ")
      const command = args[0] as HtAccessCommands
      if (command) {
        switch (command) {
          case HtAccessCommands.DirectoryIndex:
            result = this.handleDirectoryIndex(args, result)
            break
          case HtAccessCommands.Redirect:
            result += this.handleRedirect(args[1], args[2])
            break
        }
      }
    }
    const outputFileInfo = context.outputFile
    outputFileInfo.contents += result
    return outputFileInfo
  }

  protected abstract handleDirectoryIndex(args: string[], result: string): string

  protected abstract handleRedirect(from: string, to: string): string
}
