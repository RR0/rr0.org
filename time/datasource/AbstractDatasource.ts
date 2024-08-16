import { Datasource } from "./Datasource"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { RR0CaseSummaryContextFilter } from "./RR0UfoCaseContextFilter"

/**
 * Cache cases which were already fetched, and filter out cases in memory according to (time) context.
 */
export abstract class AbstractDatasource<S> implements Datasource<S> {

  protected readonly cases = new Map<string, S[]>()

  protected constructor(readonly authors: string[], readonly copyright: string) {
  }

  async getSummaries(context: HtmlRR0SsgContext): Promise<S[]> {
    const contextKey = this.contextKey(context)
    let found = this.cases.get(contextKey)
    if (!found) {
      found = await this.readCases(context)
      this.cases.set(contextKey, found)
    }
    return found
  }

  async fetch(context: HtmlRR0SsgContext): Promise<S[]> {
    const summaries = await this.getSummaries(context)
    // TODO: This filter can only apply to RROUfoCases[], not S[]
    const timeFilter = new RR0CaseSummaryContextFilter(context)
    return summaries.filter(timeFilter.filter.bind(timeFilter))
  }

  protected contextKey(context: HtmlRR0SsgContext) {
    return context.time.toString()
  }

  protected abstract readCases(context: HtmlRR0SsgContext): Promise<S[]>
}
