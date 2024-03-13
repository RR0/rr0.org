import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary"
import { CaseSource } from "../CaseSource"

export abstract class BaseOvniFranceDatasource implements CaseSource<BaseOvniFranceCaseSummary> {
  readonly author = "Chastan, Luc"
  readonly copyright = "Base OVNI France"
}
