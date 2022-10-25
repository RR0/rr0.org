import {RegexReplacer} from "../RegexReplacer"
import {HtmlSsgContext, HtmlVarName} from "../../../../HtmlSsgContext"
import {StringContextHandler} from "./StringContextHandler"

export class VarRegexReplacer implements RegexReplacer {

  constructor(
    protected context: HtmlSsgContext,
    protected varName: HtmlVarName,
    protected defaultHandlers: StringContextHandler[]
  ) {
  }

  replace(_match: string, ..._args: any[]): string {
    let varStr: string | undefined = this.context.getVar(this.varName)
    if (!varStr) {
      this.defaultHandlers.some(handle => !varStr && (varStr = handle(this.context)))
    }
    return varStr || ""
  }
}
