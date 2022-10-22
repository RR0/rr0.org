import {RegexReplaceCommand} from "../../RegexReplaceCommand"
import {ReplacerFactory} from "../../ReplacerFactory"
import {RegexReplacer} from "../../RegexReplacer"
import {SsgContext} from "../../../../../SsgContext"

export class HtmlTagReplaceCommand extends RegexReplaceCommand {

  constructor(protected tagName: string, protected replacerFactory: ReplacerFactory<RegexReplacer>) {
    super(new RegExp(`<${tagName}(\\s+.*?)?>\\s*(.+?)\\s*</${tagName}>`, "gm"))
  }

  protected createReplacer(context: SsgContext): Promise<RegexReplacer> {
    return this.replacerFactory.create(context)
  }
}
