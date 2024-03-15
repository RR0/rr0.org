import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary"
import { CaseSource } from "../CaseSource"
import { RR0SsgContext } from "../../../RR0SsgContext"

export abstract class BaseOvniFranceDatasource implements CaseSource<BaseOvniFranceCaseSummary> {
  readonly authors = ["Chastan, Luc"]
  readonly copyright = "Base OVNI France"

  abstract getAll(context: RR0SsgContext): Promise<BaseOvniFranceCaseSummary[]>
}
