import { PlaceReplacer } from "./PlaceReplacer.js"
import { DomReplacer, HtmlSsgContext, ReplacerFactory } from "ssg-api"

/**
 * Creates replacers for place HTML in a given context.
 */
export class PlaceReplacerFactory implements ReplacerFactory<DomReplacer> {

  async create(context: HtmlSsgContext): Promise<DomReplacer> {
    const instance = new PlaceReplacer()
    return {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        return instance.replacement(context, original)
      }
    }
  }
}
