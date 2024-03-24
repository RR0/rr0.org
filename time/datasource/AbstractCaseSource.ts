import { CaseSource } from "./CaseSource"
import { RR0SsgContext } from "../../RR0SsgContext"
import { UfoCase } from "./UfoCase"
import { UfoCaseContextTimeFilter } from "./UfoCaseContextTimefilter"

/**
 * Cache cases which were already fetched, and filter out cases in memory according to (time) context.
 */
export abstract class AbstractCaseSource<S extends UfoCase> implements CaseSource<S> {

  protected cases: S[]

  protected constructor(readonly authors: string[], readonly copyright: string) {
  }

  async getSummaries(context: RR0SsgContext): Promise<S[]> {
    if (!this.cases) {
      this.cases = await this.readCases(context)
    }
    return this.cases
  }

  async fetch(context: RR0SsgContext): Promise<S[]> {
    const summaries = await this.getSummaries(context)
    const timeFilter = new UfoCaseContextTimeFilter(context)
    return summaries.filter(timeFilter.filter)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<S[]>
}
