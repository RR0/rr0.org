import {FileInfo} from "../FileUtil"
import {SsiReplaceCommand, SsiReplacer} from "./SsiReplaceCommand"

export class SsiLastModifiedReplaceCommand extends SsiReplaceCommand {

  constructor() {
    super(/<!--#config timefmt="%d %B %Y %H:%M \(%Z\)" --><!--#flastmod virtual="\$DOCUMENT_URI" -->/gs)
  }

  protected createReplacer(fileInfo: FileInfo): SsiReplacer {
    return (substring: string, ...args: any[]): string => {
      return fileInfo.lastModified.toLocaleDateString()
    }
  }
}
