import {FileInfo} from "../../FileUtil"
import {SsgContext} from "../../SsgContext"
import {ReplaceCommand} from "../ReplaceCommand"

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
            const files = args.splice(1)
            for (const file of files) {
              result += `/* ${file}\n`
            }
            //result += `/*/ /:splat/${args[1]}\n`
            break
          case HtAccessCommands.Redirect:
            const host = "https://rr0.org/"
            let path = args[2].substring(host.length)
            let from = args[1]
            const trailingFrom = from.endsWith("/")
            if (trailingFrom || !from.endsWith(".html")) {
              from += (trailingFrom ? "" : "/") + "*"
              const trailingTo = path.endsWith("/")
              path += (trailingTo ? "" : "/") + ":splat"
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
