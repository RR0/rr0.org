import { DomReplacer, ReplacerFactory } from "ssg-api"
import { ChronologyReplacer } from "./ChronologyReplacer"
import { ChronologySource } from "./ChronologySource"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"

export class ChronologyReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected readonly replacer: ChronologyReplacer

  constructor(datasources: ChronologySource[]) {
    this.replacer = new ChronologyReplacer(datasources)
  }

  /**
   * Creates a contextual replacer for time tags.
   *
   * @param context
   */
  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    return {
      replace: async (ul: HTMLElement): Promise<HTMLElement> => {
        return ul.parentElement.classList.contains("contents") ? this.replacer.replacement(context, ul) : ul
      }
    }
  }
}
