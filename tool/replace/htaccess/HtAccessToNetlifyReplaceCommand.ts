import {FileInfo} from "../../FileUtil"
import {ReplaceCommand, SsgContext} from "../../Ssg"

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
  execute(context: SsgContext, fileInfo: FileInfo): FileInfo {
    let contents = fileInfo.contents
    let lines = contents.split("\n").map(line => line.trim())
    let result = ""
    for (const line of lines) {
      const args = line.split(" ")
      const command = args[0] as HtAccessCommands
      if (command) {
        switch (command) {
          case HtAccessCommands.DirectoryIndex:
            result += `/* /:splat/${args[1]}\n`
            break
          case HtAccessCommands.Redirect:
            const host = "https://rr0.org/"
            result += `${args[1]} /${args[2].substring(host.length)}\n`
            break
        }
      }
    }
    fileInfo.contents = result
    return fileInfo
  }
}
