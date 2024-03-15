import { CaseSource } from "../CaseSource"
import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { RR0SsgContext } from "../../../RR0SsgContext"

export abstract class GeipanDatasource implements CaseSource<GeipanCaseSummary> {
  readonly authors = ["GEIPAN"]
  readonly copyright = "Catalogue de cas"

  abstract getAll(context: RR0SsgContext): Promise<GeipanCaseSummary[]>
}
