import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { AbstractDatasource } from "../../../../../time/datasource/AbstractDatasource"
import { RR0SsgContext } from "../../../../../RR0SsgContext"

export abstract class GeipanDatasource extends AbstractDatasource<GeipanCaseSummary> {

  protected constructor(authors = ["GEIPAN"], copyright = "Catalogue de cas") {
    super(authors, copyright)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<GeipanCaseSummary[]>
}
