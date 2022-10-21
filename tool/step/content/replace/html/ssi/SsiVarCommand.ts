import {RegexReplaceCommand} from "../../RegexReplaceCommand"
import {RegexReplaceCallback, RegexReplacer} from "../../RegexReplacer"
import {SsgContext} from "../../../../../SsgContext"

export class SsiVarReplaceCommand extends RegexReplaceCommand {
  protected replacer: RegexReplacer

  constructor(varName: string, ssiVarReplacer: RegexReplaceCallback) {
    super(new RegExp(`<!--\\s*#set\\s+var="${varName}"\\s+value="(.+?)"\\s*-->`, "gs"))
    this.replacer = {replace: ssiVarReplacer}
  }

  protected async createReplacer(context: SsgContext): Promise<RegexReplacer> {
    return this.replacer
  }
}
