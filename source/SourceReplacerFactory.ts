import { DomReplacer, ReplacerFactory } from "ssg-api"
import { HtmlRR0SsgContext } from "../RR0SsgContext.js"
import { SourceReplacer } from "./SourceReplacer.js"

/**
 * Creates replacers for sources HTML in a given context.
 */
export class SourceReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected replacer: SourceReplacer

  constructor(replacer: SourceReplacer) {
    this.replacer = replacer
  }

  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    const replacer = this.replacer
    return {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        return replacer.replacement(context, original)
      }
    }
  }
}
