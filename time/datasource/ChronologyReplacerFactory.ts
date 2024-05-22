import { DomReplacer, ReplacerFactory } from "ssg-api"
import { ChronologyReplacer, ChronologyReplacerActions, RR0CaseMapping } from "./ChronologyReplacer"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { CaseSummaryRenderer } from "../CaseSummaryRenderer"
import { RR0Datasource } from "./rr0/RR0Datasource"
import { TimeService } from "../TimeService"

export class ChronologyReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected readonly replacer: ChronologyReplacer

  constructor(protected timeService: TimeService, datasources: RR0CaseMapping<any>[], rr0Datasource: RR0Datasource,
              actions: ChronologyReplacerActions, caseRenderer: CaseSummaryRenderer) {
    this.replacer = new ChronologyReplacer(datasources, caseRenderer, actions, rr0Datasource)
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
        const chronologyPage = ul.parentElement.classList.contains("contents")
        return isTimeFile && chronologyPage ? this.replacer.replacement(context, ul) : ul
      }
    }
  }
}
