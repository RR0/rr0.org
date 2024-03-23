import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary"
import { RR0SsgContext } from "../../../RR0SsgContext"
import { AbstractCaseSource } from "../AbstractCaseSource"

export abstract class BaseOvniFranceDatasource extends AbstractCaseSource<BaseOvniFranceCaseSummary> {
  readonly authors = ["Chastan, Luc"]
  readonly copyright = "Base OVNI France"

  protected abstract readSummaries(context: RR0SsgContext): Promise<BaseOvniFranceCaseSummary[]>
}
