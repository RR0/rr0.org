import {FileInfo} from "../FileUtil"
import {SsgReplacer} from "./SsgReplacer"
import {SsgContext} from "../SsgContext"
import {ReplaceCommand} from "./ReplaceCommand"

export abstract class RegexpReplaceCommand implements ReplaceCommand {

  protected constructor(protected regex: RegExp) {
  }

  async execute(context: SsgContext): Promise<FileInfo> {
    const fileInfo = context.currentFile!
    let contents = fileInfo.contents
    let result = contents
    do {
      contents = result
      const replacer = await this.createReplacer(context)
      result = contents.replace(this.regex, replacer.replacer)
    } while (result != contents)
    fileInfo.contents = result
    return fileInfo
  }

  protected abstract createReplacer(context: SsgContext): Promise<SsgReplacer>
}
