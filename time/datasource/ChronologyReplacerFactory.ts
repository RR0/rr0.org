import { DomReplacer, ReplacerFactory } from "ssg-api"
import { ChronologyReplacer, RR0CaseMapping } from "./ChronologyReplacer"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { RR0CaseRenderer } from "../RR0CaseRenderer"

export class ChronologyReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected readonly replacer: ChronologyReplacer

  constructor(protected timeFiles: string[], datasources: RR0CaseMapping<any>[]) {
    this.replacer = new ChronologyReplacer(datasources, new RR0CaseRenderer())
  }

  /**
   * Creates a contextual replacer for time tags.
   *
   * @param context
   */
  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    return {
      replace: async (ul: HTMLUListElement): Promise<HTMLUListElement> => {
        return this.timeFiles.includes(context.inputFile.name) && ul.parentElement.classList.contains(
          "contents") ? this.replacer.replacement(context, ul) : ul
      }
    }
  }
}
