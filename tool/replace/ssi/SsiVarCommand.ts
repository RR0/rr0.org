import {RegexpReplaceCommand} from "../RegexpReplaceCommand"
import {ReplaceCall, SsgReplacer} from "../SsgReplacer"
import {SsgContext} from "../../SsgContext"

export class SsiVarReplaceCommand extends RegexpReplaceCommand {
  protected replacer: SsgReplacer

  constructor(varName: string, ssiVarReplacer: ReplaceCall) {
    super(new RegExp(`<!--\\s*#set\\s+var="${varName}"\\s+value="(.+?)"\\s*-->`, "gs"))
    this.replacer = {replacer: ssiVarReplacer}
  }

  protected async createReplacer(context: SsgContext): Promise<SsgReplacer> {
    return this.replacer
  }
}
