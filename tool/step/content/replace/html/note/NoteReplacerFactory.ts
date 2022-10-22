import {ReplacerFactory} from "../../ReplacerFactory"
import {NoteReplacer} from "./NoteReplacer"
import {DomReplacer} from "../../DomReplacer"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"

/**
 * Creates replacers for notes HTML in a given context.
 */
export class NoteReplacerFactory implements ReplacerFactory<DomReplacer> {

  async create(context: HtmlSsgContext): Promise<DomReplacer> {
    const instance = new NoteReplacer()
    return {
      replace: (original: Element): Element => {
        return instance.replacement(context, original)
      }
    }
  }
}
