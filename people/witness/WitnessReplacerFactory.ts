import { RegexReplacer, ReplacerFactory } from "ssg-api"
import { WitnessReplacer } from "./WitnessReplacer"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"

/**
 * Creates replacers for caviarded HTML in a given context.
 */
export class WitnessReplacerFactory implements ReplacerFactory<RegexReplacer> {

  protected readonly singleton = new WitnessReplacer()

  async create(context: HtmlRR0SsgContext): Promise<RegexReplacer> {
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
    return this.singleton
  }
}
