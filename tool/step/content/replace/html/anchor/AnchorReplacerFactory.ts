import {ReplacerFactory} from "../../ReplacerFactory"
import {RegexReplacer} from "../../RegexReplacer"
import {SsgContext} from "../../../../../SsgContext"
import {AnchorReplacer} from "./AnchorReplacer"

export class AnchorReplacerFactory implements ReplacerFactory<RegexReplacer> {

  protected singleton?: AnchorReplacer

  async create(context: SsgContext): Promise<RegexReplacer> {
    const instance = await this.getInstance()
    return {
      replace: (matchedTagStr: string, ...args: any[]): string => {
        const dir = args[0]
        const file = args[2]
        const contents = args[3]?.trim()
        return instance.replacement(context, matchedTagStr, dir, file, contents)
      }
    }
  }

  protected async getInstance(): Promise<AnchorReplacer> {
    if (!this.singleton) {
      this.singleton = new AnchorReplacer()
    }
    return this.singleton
  }
}
