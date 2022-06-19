import {FileInfo} from "../FileUtil"
import {SsiReplaceCommand, SsiReplacer} from "./SsiReplaceCommand"

export class SsiIfReplaceCommand extends SsiReplaceCommand {

  constructor() {
    super(/<!--\s*#if\s+expr="(.+?)=(.+?)"\s*-->(.*?)<!--\s*#else\s*-->(.*?)<!--\s*#endif\s*-->/gs)
  }

  protected replacer = (substring: string, ...args: any[]): string => {
    let condVar = args[0]
    let condValue = args[1]
    let trueContent = args[2]
    let falseContent = args[3]
    return condVar === condValue ? trueContent : falseContent
  }

  protected createReplacer(fileInfo: FileInfo): SsiReplacer {
    return this.replacer
  }
}
