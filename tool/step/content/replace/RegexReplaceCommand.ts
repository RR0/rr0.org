import {RegexReplacer} from "./RegexReplacer"
import {ReplaceCommand} from "./ReplaceCommand"
import {FileInfo} from "../../../util/file/FileInfo"
import {HtmlSsgContext} from "../../../HtmlSsgContext"

export abstract class RegexReplaceCommand implements ReplaceCommand {

  protected constructor(protected regex: RegExp) {
  }

  async execute(context: HtmlSsgContext): Promise<FileInfo> {
    const fileInfo = context.currentFile!
    let contents = fileInfo.contents
    let result = contents
    const replacer = await this.createReplacer(context)
    do {
      contents = result
      result = contents.replace(this.regex, replacer.replace)
    } while (result != contents)
    fileInfo.contents = result
    return fileInfo
  }

  protected abstract createReplacer(context: HtmlSsgContext): Promise<RegexReplacer>
}
