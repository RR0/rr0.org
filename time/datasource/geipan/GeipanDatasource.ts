import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { RR0SsgContext } from "../../../RR0SsgContext"
import { AbstractCaseSource } from "../AbstractCaseSource"

export abstract class GeipanDatasource extends AbstractCaseSource<GeipanCaseSummary> {
  readonly authors = ["GEIPAN"]
  readonly copyright = "Catalogue de cas"

  protected abstract readSummaries(context: RR0SsgContext): S[]
}
