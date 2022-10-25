import {RegexReplaceCommand} from "../RegexReplaceCommand"
import {HtmlSsgContext, HtmlVarName} from "../../../../HtmlSsgContext"
import {RegexReplacer} from "../RegexReplacer"
import {VarRegexReplacer} from "./VarRegexReplacer"
import {StringContextHandler} from "./StringContextHandler"

export class StringEchoVarReplaceCommand extends RegexReplaceCommand {

  constructor(protected varName: HtmlVarName, protected defaultHandlers: StringContextHandler[] = []) {
    super(new RegExp(`\\$\{mail\}`, "gs"))
  }

  protected async createReplacer(context: HtmlSsgContext): Promise<RegexReplacer> {
    return new VarRegexReplacer(context, this.varName, this.defaultHandlers)
  }
}
