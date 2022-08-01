import {ReplaceCommand} from "../Ssg"
import {FileInfo} from "../FileUtil"
import {SsgReplacer} from "./SsgReplacer"
import {SsgContext} from "../SsgContext"

export type Replacer = (substring: string, ...args: any[]) => string

export abstract class RegexpReplaceCommand implements ReplaceCommand {

  protected constructor(protected regex: RegExp) {
  }

  async execute(context: SsgContext, fileInfo: FileInfo): Promise<FileInfo> {
    let contents = fileInfo.contents
    let result = contents
    do {
      contents = result
      const replacer = await this.createReplacer(context, fileInfo)
      result = contents.replace(this.regex, replacer.replacer)
    } while (result != contents)
    fileInfo.contents = result
    return fileInfo
  }

  protected abstract createReplacer(context: SsgContext, fileInfo: FileInfo): Promise<SsgReplacer>
}
