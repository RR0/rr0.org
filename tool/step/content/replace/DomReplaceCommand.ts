import {ReplaceCommand} from "./ReplaceCommand"
import {FileInfo} from "../../../util/file/FileInfo"
import {HtmlSsgContext} from "../../../HtmlSsgContext"
import {DomReplacer} from "./DomReplacer"

export abstract class DomReplaceCommand<T extends HTMLElement = HTMLElement> implements ReplaceCommand<HtmlSsgContext> {

  constructor(protected selector: string) {
  }

  async execute(context: HtmlSsgContext): Promise<FileInfo> {
    const fileInfo = context.inputFile
    let contents = fileInfo.contents
    let result = contents
    const replacer = await this.createReplacer(context)
    do {
      contents = result
      const doc = fileInfo.dom.window.document
      const elements = doc.querySelectorAll(this.selector)
      if (elements.length > 0) {
        for (const element of elements) {
          const replaced = await replacer.replace(element)
          element.replaceWith(replaced)
        }
        result = fileInfo.dom.serialize()
      }
    } while (result != contents)
    fileInfo.contents = result
    return fileInfo
  }

  protected abstract createReplacer(context: HtmlSsgContext): Promise<DomReplacer<T>>
}
