import { NuforcCaseSummary } from "./NuforcCaseSummary"
import { CaseSource } from "../CaseSource"

export abstract class NuforcHttpDatasource implements CaseSource<NuforcCaseSummary> {
  readonly author = "NUFORC"
  readonly copyright = "Online Database"
}
