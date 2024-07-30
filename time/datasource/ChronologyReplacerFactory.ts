import { DomReplacer, ReplacerFactory } from "ssg-api"
import { ChronologyReplacer } from "./ChronologyReplacer"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { CaseSummaryRenderer } from "../CaseSummaryRenderer"
import { TimeService } from "../TimeService"
import { RR0CaseMapping } from "./rr0/RR0CaseMapping"
import { RR0Mapping } from "./rr0/RR0Mapping"

export class ChronologyReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected readonly replacer: ChronologyReplacer

  constructor(protected timeService: TimeService, datasources: RR0CaseMapping<any>[], rr0Mapping: RR0Mapping,
              caseRenderer: CaseSummaryRenderer) {
    this.replacer = new ChronologyReplacer(datasources, caseRenderer, rr0Mapping)
  }

  /**
   * Creates a contextual replacer for time tags.
   *
   * @param context
   */
  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    return {
      replace: async (ul: HTMLUListElement): Promise<HTMLUListElement> => {
        const isTimeFile = await this.timeService.isTimeFile(context.file.name)
        if (isTimeFile) {
          ul = await this.replacer.replacement(context, ul)
        }
        return ul
      }
    }
  }
}
