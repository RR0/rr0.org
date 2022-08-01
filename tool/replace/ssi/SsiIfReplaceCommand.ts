import {FileInfo} from "../../FileUtil"
import {RegexpReplaceCommand} from "../RegexpReplaceCommand"
import {SsgReplacer} from "../SsgReplacer"
import {SsgContext} from "../../SsgContext"

export class SsiIfReplaceCommand extends RegexpReplaceCommand {

  protected readonly replacer = {
    replacer: (substring: string, ...args: any[]): string => {
      let condVar = args[0]
      let condValue = args[1]
      let trueContent = args[2]
      let falseContent = args[3]
      return condVar === condValue ? trueContent : falseContent
    }
  }

  constructor() {
    super(/<!--\s*#if\s+expr="(.+?)=(.+?)"\s*-->(.*?)<!--\s*#else\s*-->(.*?)<!--\s*#endif\s*-->/gs)
  }

  protected async createReplacer(context: SsgContext, fileInfo: FileInfo): Promise<SsgReplacer> {
    return this.replacer
  }
}
