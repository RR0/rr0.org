import { TimeReplacer } from "./TimeReplacer.js"
import { HtmlRR0SsgContext } from "../RR0SsgContext.js"
import { DomReplacer, ReplacerFactory } from "ssg-api"

export class TimeReplacerFactory implements ReplacerFactory<DomReplacer> {

  constructor(protected readonly replacer: TimeReplacer) {
  }

  /**
   * Creates a contextual replacer for time tags.
   *
   * @param context
   */
  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    return {
      replace: (original: HTMLTimeElement): Promise<HTMLElement> => {
        return this.replacer.replacement(
          this.replacer.factory.renderer.timeFiles.includes(context.file.name) ? context.clone() : context, original)
      }
    }
  }
}
