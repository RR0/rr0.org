import { DomReplacer, ReplacerFactory } from "ssg-api"
import { ChronologyReplacer } from "./ChronologyReplacer.js"
import { HtmlRR0SsgContext } from "../../RR0SsgContext.js"
import { CaseSummaryRenderer } from "../CaseSummaryRenderer.js"
import { TimeService } from "../TimeService.js"
import { RR0CaseMapping } from "./rr0/RR0CaseMapping.js"

export class ChronologyReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected readonly replacer: ChronologyReplacer

  constructor(protected timeService: TimeService, datasources: RR0CaseMapping<any>[],
              caseRenderer: CaseSummaryRenderer) {
    this.replacer = new ChronologyReplacer(datasources, caseRenderer)
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
