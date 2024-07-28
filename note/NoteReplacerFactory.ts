import { DomReplacer, HtmlSsgContext, ReplacerFactory } from "ssg-api"
import { NoteReplacer } from "./NoteReplacer"

/**
 * Creates replacers for notes HTML in a given context.
 */
export class NoteReplacerFactory implements ReplacerFactory<DomReplacer> {

  constructor(protected replacer: NoteReplacer) {
  }

  async create(context: HtmlSsgContext): Promise<DomReplacer> {
    const instance = this.replacer
    return {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        return instance.replacement(context, original)
      }
    }
  }
}
