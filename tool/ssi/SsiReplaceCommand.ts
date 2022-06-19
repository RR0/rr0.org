import {ReplaceCommand, SsgContext} from "../Ssg"
import {FileInfo} from "../FileUtil"

export type SsiReplacer = (substring: string, ...args: any[]) => string

export abstract class SsiReplaceCommand implements ReplaceCommand {

  protected constructor(protected regex: RegExp) {
  }

  execute(context: SsgContext, fileInfo: FileInfo): FileInfo {
    let contents = fileInfo.contents
    let result = contents
    do {
      contents = result
      const replacer = this.createReplacer(context, fileInfo)
      result = contents.replace(this.regex, replacer)
    } while (result != contents)
    fileInfo.contents = result
    return fileInfo
  }

  protected abstract createReplacer(context: SsgContext, fileInfo: FileInfo): SsiReplacer
}
