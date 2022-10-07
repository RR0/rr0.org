import {RegexpReplaceCommand} from "../../RegexpReplaceCommand"
import {ReplacerFactory} from "../../ReplacerFactory"
import {SsgContext} from "../../../../../SsgContext"
import {SsgReplacer} from "../../SsgReplacer"

export class HtmlAnchorReplaceCommand extends RegexpReplaceCommand {

  constructor(protected replacerFactory: ReplacerFactory) {
    super(new RegExp(`<a href="((?:https?\:\\/\\/)?[^ ]+?)?(?:\\/([^ :/]+\\.[^ ]+)?)?"( .*?)?>(.+?)<\\/a>`, "gm"))
  }

  protected createReplacer(context: SsgContext): Promise<SsgReplacer> {
    return this.replacerFactory.create(context)
  }
}
