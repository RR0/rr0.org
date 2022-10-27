import {ReplacerFactory} from "../../ReplacerFactory"
import {SourceReplacer} from "./SourceReplacer"
import {DomReplacer} from "../../DomReplacer"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"

/**
 * Creates replacers for sources HTML in a given context.
 */
export class SourceReplacerFactory implements ReplacerFactory<DomReplacer> {

  async create(context: HtmlSsgContext): Promise<DomReplacer> {
    const instance = new SourceReplacer()
    return {
      async replace(original: Element): Promise<Element> {
        return instance.replacement(context, original)
      }
    }
  }
}
