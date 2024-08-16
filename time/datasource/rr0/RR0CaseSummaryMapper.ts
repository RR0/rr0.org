import { CaseMapper } from "../CaseMapper"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { RR0CaseSummary } from "./RR0CaseSummary"

export class RR0CaseSummaryMapper implements CaseMapper<HtmlRR0SsgContext, RR0CaseSummary, RR0CaseSummary> {

  constructor(readonly baseUrl: URL, readonly copyright: string, readonly authors: string[]) {
  }

  map(context: HtmlRR0SsgContext, sourceCase: RR0CaseSummary, sourceTime: Date): RR0CaseSummary {
    return sourceCase   // Mapping RR0 to RR0 is idle
  }
}
