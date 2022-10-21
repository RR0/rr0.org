import {RegexReplaceCommand} from "../../RegexReplaceCommand"
import {ReplacerFactory} from "../../ReplacerFactory"
import {RegexReplacer} from "../../RegexReplacer"
import {SsgContext} from "../../../../../SsgContext"

/**
 * @deprecated Can't work tags with regexes.
 */
export class ClassRegexReplaceCommand extends RegexReplaceCommand {

  constructor(protected className: string, protected replacerFactory: ReplacerFactory<RegexReplacer>) {
    super(new RegExp(`<[A-z\-]+?\\s+class="${className}">\\s*(.+?)\\s*<\/[A-z\-]+?>`, "gm"))
  }

  protected createReplacer(context: SsgContext): Promise<RegexReplacer> {
    return this.replacerFactory.create(context)
  }
}
