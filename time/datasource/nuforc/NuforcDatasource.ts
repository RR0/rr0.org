import { NuforcCaseSummary } from "./NuforcCaseSummary"
import { CaseSource } from "../CaseSource"
import { RR0SsgContext } from "../../../RR0SsgContext"

export abstract class NuforcDatasource implements CaseSource<NuforcCaseSummary> {
  readonly authors = ["NUFORC"]
  readonly copyright = "Online Database"

  abstract fetch(context: RR0SsgContext): Promise<NuforcCaseSummary[]>
}
