import {RegexReplaceCommand} from "../../RegexReplaceCommand"
import {ReplacerFactory} from "../../ReplacerFactory"
import {SsgContext} from "../../../../../SsgContext"
import {RegexReplacer} from "../../RegexReplacer"

export class HtmlAnchorReplaceCommand extends RegexReplaceCommand {

  constructor(protected replacerFactory: ReplacerFactory<RegexReplacer>) {
    super(new RegExp(`<a href="((?:https?\:\\/\\/)?[^ ]+?)?(?:\\/([^ :/]+\\.[^ ]+)?)?"( .*?)?>(.+?)<\\/a>`, "gm"))
  }

  protected createReplacer(context: SsgContext): Promise<RegexReplacer> {
    return this.replacerFactory.create(context)
  }
}
