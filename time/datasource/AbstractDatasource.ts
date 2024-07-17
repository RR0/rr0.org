import { Datasource } from "./Datasource"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { UfoCaseContextTimeFilter } from "./UfoCaseContextTimefilter"

/**
 * Cache cases which were already fetched, and filter out cases in memory according to (time) context.
 */
export abstract class AbstractDatasource<S> implements Datasource<S> {

  protected cases: S[]

  protected constructor(readonly authors: string[], readonly copyright: string) {
  }

  async getSummaries(context: HtmlRR0SsgContext): Promise<S[]> {
    // TODO: Cases should be cached per context (time, place, etc.)
    if (!this.cases) {
      this.cases = await this.readCases(context)
    }
    return this.cases
  }

  async fetch(context: HtmlRR0SsgContext): Promise<S[]> {
    const summaries = await this.getSummaries(context)
    // TODO: This filter can only apply to RROUfoCases[], not S[]
    const timeFilter = new UfoCaseContextTimeFilter(context)
    return summaries.filter(timeFilter.filter.bind(timeFilter))
  }

  protected abstract readCases(context: HtmlRR0SsgContext): Promise<S[]>
}
