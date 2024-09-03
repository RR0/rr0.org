import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { AbstractDatasource } from "../../../../../time/datasource/AbstractDatasource"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../../../../RR0SsgContext"
import { RR0ContextFilter } from "../../../../../time/datasource/rr0/RR0Datasource"

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
