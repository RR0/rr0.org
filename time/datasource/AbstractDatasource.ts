import { Datasource } from "./Datasource"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"

/**
 * Cache cases which were already fetched, and filter out cases in memory according to (time) context.
 */
export abstract class AbstractDatasource<S> implements Datasource<S> {

  protected readonly cases = new Map<string, S[]>()

  protected constructor(readonly authors: string[], readonly copyright: string) {
  }

  async getCases(context: HtmlRR0SsgContext): Promise<S[]> {
    const contextKey = this.contextKey(context)
    let found = this.cases.get(contextKey)
    if (!found) {
      found = await this.readCases(context)
      this.cases.set(contextKey, found)
    }
    return found
  }

  async fetch(context: HtmlRR0SsgContext): Promise<S[]> {
    const summaries = await this.getCases(context)
    // TODO: This filter can only apply to RROUfoCases[], not S[]
    const contextFilter = this.createFilter(context)
    return summaries.filter(contextFilter.filter.bind(contextFilter))
  }

  protected abstract createFilter(context: HtmlRR0SsgContext)

  protected contextKey(context: HtmlRR0SsgContext) {
    return context.time.toString()
  }

  protected abstract readCases(context: HtmlRR0SsgContext): Promise<S[]>
}
