import {ReplacerFactory} from "../../ReplacerFactory"
import {NoteReplacer} from "./NoteReplacer"
import {DomReplacer} from "../../DomReplacer"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"

/**
 * Creates replacers for notes HTML in a given context.
 */
export class NoteReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected singleton?: NoteReplacer

  async create(context: HtmlSsgContext): Promise<DomReplacer> {
    const instance = await this.getInstance()
    return {
      replace: (original: Element): Element => {
        return instance.replacement(context, original)
      }
    }
  }

  protected async getInstance(): Promise<NoteReplacer> {
    if (!this.singleton) {
      this.singleton = new NoteReplacer()
    }
    return this.singleton
  }
}
