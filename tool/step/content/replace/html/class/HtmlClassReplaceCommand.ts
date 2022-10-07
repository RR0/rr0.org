import {RegexpReplaceCommand} from "../../RegexpReplaceCommand"
import {ReplacerFactory} from "../../ReplacerFactory"
import {SsgReplacer} from "../../SsgReplacer"
import {SsgContext} from "../../../../../SsgContext"

export class HtmlClassReplaceCommand extends RegexpReplaceCommand {

  constructor(protected className: string, protected replacerFactory: ReplacerFactory) {
    super(new RegExp(`<[A-z\-]+?\\s+class="${className}">\\s*(.+?)\\s*<\/[A-z\-]+?>`, "gm"))
  }

  protected createReplacer(context: SsgContext): Promise<SsgReplacer> {
    return this.replacerFactory.create(context)
  }
}
