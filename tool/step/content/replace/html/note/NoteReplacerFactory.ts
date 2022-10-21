import {ReplacerFactory} from "../../ReplacerFactory"
import {RegexReplacer} from "../../RegexReplacer"
import {SsgContext} from "../../../../../SsgContext"
import {NoteReplacer} from "./NoteReplacer"

/**
 * Creates replacers for notes HTML in a given context.
 */
export class NoteReplacerFactory implements ReplacerFactory<RegexReplacer> {

  protected singleton?: NoteReplacer

  async create(context: SsgContext): Promise<RegexReplacer> {
    const instance = await this.getInstance()
    return {
      replace: (substring: string, ...args: any[]): string => {
        const content = args[0]
        return instance.replacement(context, substring, content)
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
