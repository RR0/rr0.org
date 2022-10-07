import {SsgReplacer} from "./SsgReplacer"
import {ReplaceCommand} from "./ReplaceCommand"
import {FileInfo} from "../../../util/file/FileInfo"
import {HtmlSsgContext} from "../../../HtmlSsgContext"

export abstract class RegexpReplaceCommand implements ReplaceCommand {

  protected constructor(protected regex: RegExp) {
  }

  async execute(context: HtmlSsgContext): Promise<FileInfo> {
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

  protected abstract createReplacer(context: HtmlSsgContext): Promise<SsgReplacer>
}
