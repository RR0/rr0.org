import {FileInfo} from "../../FileUtil"
import {ReplaceCommand} from "../../Ssg"
import {SsgContext} from "../../SsgContext"

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

export class HtAccessToNetlifyReplaceCommand implements ReplaceCommand {
  async execute(context: SsgContext): Promise<FileInfo> {
    const fileInfo = context.currentFile!
    const contents = fileInfo.contents
    const lines = contents.split("\n").map(line => line.trim())
    let result = ""
    for (const line of lines) {
      const args = line.split(" ")
      const command = args[0] as HtAccessCommands
      if (command) {
        switch (command) {
          case HtAccessCommands.DirectoryIndex:
            result += `/* ${args[1]}\n`
            //result += `/*/ /:splat/${args[1]}\n`
            break
          case HtAccessCommands.Redirect:
            const host = "https://rr0.org/"
            let path = args[2].substring(host.length)
            let from = args[1]
            if (from.endsWith("/") || !from.endsWith(".html")) {
              from += "/*"
              path += "/:splat"
            }
            result += `${from} /${path}\n`
            break
        }
      }
    }
    fileInfo.contents = result
    return fileInfo
  }
}
