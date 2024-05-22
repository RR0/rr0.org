import { TimeReplacer } from "./TimeReplacer"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { DomReplacer, ReplacerFactory } from "ssg-api"
import { TimeRenderer } from "./TimeRenderer"

export class TimeReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected readonly replacer: TimeReplacer

  constructor(protected renderer: TimeRenderer) {
    this.replacer = new TimeReplacer(renderer)
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
          this.renderer.timeFiles.includes(context.file.name) ? context.clone() : context, original)
      }
    }
  }
}
