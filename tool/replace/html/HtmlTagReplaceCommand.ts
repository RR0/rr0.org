import {FileInfo} from "../../FileUtil"
import {RegexpReplaceCommand} from "../RegexpReplaceCommand"
import {ReplacerFactory} from "../ReplacerFactory"
import {SsgReplacer} from "../SsgReplacer"
import {SsgContext} from "../../SsgContext"

export class HtmlTagReplaceCommand extends RegexpReplaceCommand {

  constructor(protected tagName: string, protected replacerFactory: ReplacerFactory) {
    super(new RegExp(`<${tagName}>s*(.+?)s*</${tagName}>`, "gs"))
  }

  protected createReplacer(context: SsgContext, fileInfo: FileInfo): SsgReplacer {
    return this.replacerFactory.create(context)
  }
}
