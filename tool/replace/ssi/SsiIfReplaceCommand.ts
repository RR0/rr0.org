import {FileInfo} from "../../FileUtil"
import {RegexpReplaceCommand, Replacer} from "../RegexpReplaceCommand"
import {SsgContext} from "../../Ssg"

export class SsiIfReplaceCommand extends RegexpReplaceCommand {

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

  protected createReplacer(context: SsgContext, fileInfo: FileInfo): Replacer {
    return this.replacer
  }
}
