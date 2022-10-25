import {RegexReplacer} from "./RegexReplacer"
import {ReplaceCommand} from "./ReplaceCommand"
import {FileInfo} from "../../../util/file/FileInfo"
import {SsgContext} from "../../../SsgContext"

export abstract class RegexReplaceCommand implements ReplaceCommand<SsgContext> {

  protected constructor(protected regex: RegExp) {
  }

  async execute(context: SsgContext): Promise<FileInfo> {
    const fileInfo = context.inputFile
    let contents = fileInfo.contents
    let result = contents
    const replacer = await this.createReplacer(context)
    const replaceFunc = replacer.replace.bind(replacer)
    do {
      contents = result
      result = contents.replace(this.regex, replaceFunc)
    } while (result != contents)
    fileInfo.contents = result
    return fileInfo
  }

  protected abstract createReplacer(context: SsgContext): Promise<RegexReplacer>
}
