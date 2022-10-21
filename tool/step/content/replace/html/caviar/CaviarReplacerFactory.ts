import {ReplacerFactory} from "../../ReplacerFactory"
import {RegexReplacer} from "../../RegexReplacer"
import {SsgContext} from "../../../../../SsgContext"
import {CaviarReplacer} from "./CaviarReplacer"

/**
 * Creates replacers for caviarded HTML in a given context.
 */
export class CaviarReplacerFactory implements ReplacerFactory<RegexReplacer> {

  protected singleton?: CaviarReplacer

  async create(context: SsgContext): Promise<RegexReplacer> {
    const instance = await this.getInstance()
    return {
      replace: (substring: string, ...args: any[]): string => {
        const witnessNumber = args[0]
        const witnessName = args[1]
        return instance.replacement(context, substring, witnessName, witnessNumber)
      }
    }
  }

  protected async getInstance(): Promise<CaviarReplacer> {
    if (!this.singleton) {
      this.singleton = new CaviarReplacer()
    }
    return this.singleton
  }
}
