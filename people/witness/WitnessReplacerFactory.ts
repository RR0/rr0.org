import {RegexReplacer, ReplacerFactory, SsgContext} from "ssg-api"
import {WitnessReplacer} from "./WitnessReplacer"

/**
 * Creates replacers for caviarded HTML in a given context.
 */
export class WitnessReplacerFactory implements ReplacerFactory<RegexReplacer> {

  protected singleton?: WitnessReplacer

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

  protected async getInstance(): Promise<WitnessReplacer> {
    if (!this.singleton) {
      this.singleton = new WitnessReplacer()
    }
    return this.singleton
  }
}
