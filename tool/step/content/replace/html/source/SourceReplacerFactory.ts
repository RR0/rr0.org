import {ReplacerFactory} from "../../ReplacerFactory"
import {SourceReplacer} from "./SourceReplacer"
import {DomReplacer} from "../../DomReplacer"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"

/**
 * Creates replacers for notes HTML in a given context.
 */
export class SourceReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected singleton?: SourceReplacer

  async create(context: HtmlSsgContext): Promise<DomReplacer> {
    const instance = await this.getInstance()
    return {
      replace: (original: Element): Element => {
        return instance.replacement(context, original)
      }
    }
  }

  protected async getInstance(): Promise<SourceReplacer> {
    if (!this.singleton) {
      this.singleton = new SourceReplacer()
    }
    return this.singleton
  }
}
