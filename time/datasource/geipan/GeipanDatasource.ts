import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { RR0SsgContext } from "../../../RR0SsgContext"
import { AbstractDatasource } from "../AbstractDatasource"

export abstract class GeipanDatasource extends AbstractDatasource<GeipanCaseSummary> {

  protected constructor(authors = ["GEIPAN"], copyright = "Catalogue de cas") {
    super(authors, copyright)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<GeipanCaseSummary[]>
}
