import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary"
import { RR0SsgContext } from "../../../RR0SsgContext"
import { AbstractCaseSource } from "../AbstractCaseSource"

export abstract class BaseOvniFranceDatasource extends AbstractCaseSource<BaseOvniFranceCaseSummary> {

  protected constructor(authors = ["Chastan, Luc"], copyright = "Base OVNI France") {
    super(authors, copyright)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<BaseOvniFranceCaseSummary[]>
}
