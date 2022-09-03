import {RegexpReplaceCommand} from "../replace/RegexpReplaceCommand"
import {ReplacerFactory} from "../replace/ReplacerFactory"
import {SsgContext} from "../SsgContext"
import {SsgReplacer} from "../replace/SsgReplacer"

export class HtmlAnchorReplaceCommand extends RegexpReplaceCommand {

  constructor(protected replacerFactory: ReplacerFactory) {
    super(new RegExp(`<a href="((?:https?\:\\/\\/)?[^ ]+?)?(?:\\/([^ :/]+\\.[^ ]+)?)?"( .*?)?>(.+?)<\\/a>`, "gm"))
  }

  protected createReplacer(context: SsgContext): Promise<SsgReplacer> {
    return this.replacerFactory.create(context)
  }
}
