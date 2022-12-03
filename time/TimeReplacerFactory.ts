import {TimeReplacer} from "./TimeReplacer"
import {HtmlRR0SsgContext} from "../RR0SsgContext"
import {DomReplacer, ReplacerFactory} from "ssg-api"

export class TimeReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected readonly replacer: TimeReplacer

  constructor(timeFiles: string[]) {
    this.replacer = new TimeReplacer(timeFiles)
  }

  /**
   * Creates a contextual replacer for time tags.
   *
   * @param context
   */
  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    return {
      replace: (original: HTMLElement): Promise<HTMLElement> => {
        return this.replacer.replacement(context, original)
      }
    }
  }
}
