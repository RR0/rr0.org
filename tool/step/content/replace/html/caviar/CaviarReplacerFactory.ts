import {ReplacerFactory} from "../../ReplacerFactory"
import {SsgReplacer} from "../../SsgReplacer"
import {SsgContext} from "../../../../../SsgContext"
import {CaviarReplacer} from "./CaviarReplacer"

/**
 * Creates replacers for caviarded HTML in a given context.
 */
export class CaviarReplacerFactory implements ReplacerFactory {

  protected singleton?: CaviarReplacer

  async create(context: SsgContext): Promise<SsgReplacer> {
    const instance = await this.getInstance()
    return {
      replacer:
        /**
         * Replace time tags but urls.
         */
        (substring: string, ...args: any[]): string => {
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
