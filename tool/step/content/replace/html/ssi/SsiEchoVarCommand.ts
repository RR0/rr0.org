import {RegexReplaceCommand} from "../../RegexReplaceCommand"
import {RegexReplacer} from "../../RegexReplacer"
import {HtmlSsgContext, HtmlVarName} from "../../../../../HtmlSsgContext"
import {StringContextHandler} from "../StringContextHandler"
import {VarRegexReplacer} from "../VarRegexReplacer"

/**
 * Replaces SSI's <!-- #echo var="someVar" --> by someVar's value.
 */
export class SsiEchoVarReplaceCommand extends RegexReplaceCommand<HtmlSsgContext> {

  constructor(protected varName: HtmlVarName, protected defaultHandlers: StringContextHandler[] = []) {
    super(new RegExp(`<!--\\s*#echo\\s+var="${String(varName)}"\\s*-->`, "gs"))
  }

  protected async createReplacer(context: HtmlSsgContext): Promise<RegexReplacer> {
    return new VarRegexReplacer(context, this.varName, this.defaultHandlers)
  }
}
