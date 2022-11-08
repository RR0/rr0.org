import {ReplacerFactory} from "../tool/step/content/replace/ReplacerFactory"
import {SourceReplacer} from "./SourceReplacer"
import {DomReplacer} from "../tool/step/content/replace/DomReplacer"
import {HtmlSsgContext} from "../tool/HtmlSsgContext"

/**
 * Creates replacers for sources HTML in a given context.
 */
export class SourceReplacerFactory implements ReplacerFactory<DomReplacer> {

  async create(context: HtmlSsgContext): Promise<DomReplacer> {
    const replacer = new SourceReplacer()
    return {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        return replacer.replacement(context, original)
      }
    }
  }
}
