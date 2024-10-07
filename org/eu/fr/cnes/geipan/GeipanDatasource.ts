import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import { AbstractDatasource } from "../../../../../time/datasource/AbstractDatasource.js"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../../../../RR0SsgContext.js"
import { RR0ContextFilter } from "../../../../../time/datasource/rr0/RR0Datasource.js"

export abstract class GeipanDatasource extends AbstractDatasource<GeipanCaseSummary> {

  protected constructor(authors = ["GEIPAN"], copyright = "Catalogue de cas") {
    super(authors, copyright)
  }

  protected createFilter(context: HtmlRR0SsgContext) {
    // TODO: Use a GEIPAN-specific filter instead
    return new RR0ContextFilter(context)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<GeipanCaseSummary[]>
}
