import {RegexReplacer} from "./RegexReplacer"
import {ReplaceCommand} from "./ReplaceCommand"
import {FileInfo} from "../../../util/file/FileInfo"
import {SsgContext} from "../../../SsgContext"

/**
 * Performs replacements using a Regular Expression to find patterns to replace.
 */
export abstract class RegexReplaceCommand implements ReplaceCommand<SsgContext> {

  protected constructor(protected regex: RegExp) {
  }

  /**
   * Perform the replacements on context.inputFile until it is no longer modified by them.
   *
   * @param context
   */
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
