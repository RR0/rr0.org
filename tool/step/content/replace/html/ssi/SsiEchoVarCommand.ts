import {RegexReplaceCommand} from "../../RegexReplaceCommand"
import {RegexReplacer} from "../../RegexReplacer"
import {SsgContext} from "../../../../../SsgContext"

export abstract class SsiEchoVarReplaceCommand extends RegexReplaceCommand {

  protected constructor(varName: string) {
    super(new RegExp(`<!--\\s*#echo\\s+var="${varName}"\\s*-->`, "gs"))
  }

  protected abstract createReplacer(context: SsgContext): Promise<RegexReplacer>
}
