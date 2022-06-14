import {ReplaceCommand} from "./ssg"
import {getFileInfo} from "./FileUtil"
import path from "path"

export class SsiReplaceCommand implements ReplaceCommand {
  constructor(protected regex: RegExp, protected replacer: (substring: string, ...args: any[]) => string) {
  }

  execute(contents: string): string {
    let result = contents
    do {
      contents = result
      result = contents.replace(this.regex, this.replacer)
    } while (result != contents)
    return result
  }
}

export class SsiIncludeReplaceCommand extends SsiReplaceCommand {

  constructor() {
    super(
      /<!--\s*#include\s+virtual="(.+?)"\s*-->/g,
      (substring: string, ...args: any[]): string => {
        const fileName = path.join(process.cwd(), args[0])
        const replacement = getFileInfo(fileName)
        return replacement.contents
      }
    )
  }
}

export class SsiIfReplaceCommand extends SsiReplaceCommand {

  constructor() {
    super(
      /<!--\s*#if\s+expr="(.+?)=(.+?)"\s*-->(.*?)<!--\s*#else\s*-->(.*?)<!--\s*#endif\s*-->/gs,
      (substring: string, ...args: any[]): string => {
        let condVar = args[0]
        let condValue = args[1]
        let trueContent = args[2]
        let falseContent = args[3]
        return condVar === condValue ? trueContent : falseContent
      }
    )
  }
}
