import { DomReplacer, ReplacerFactory } from "ssg-api"
import { WitnessReplacer } from "./WitnessReplacer"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"

/**
 * Creates replacers for caviarded HTML in a given context.
 */
export class WitnessReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected readonly singleton = new WitnessReplacer()

  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    const instance = await this.getInstance()
    return {
      replace: async (original: HTMLElement): Promise<HTMLElement> => {
        const witnessId = original.className.substring("temoin".length)
        const witnessName = original.textContent
        return instance.replacement(context, witnessName, witnessId)
      }
    }
  }

  protected async getInstance(): Promise<WitnessReplacer> {
    return this.singleton
  }
}
