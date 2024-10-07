import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary.js"
import { RR0SsgContext } from "../../../RR0SsgContext.js"
import { AbstractDatasource } from "../AbstractDatasource.js"

export abstract class BaseOvniFranceDatasource extends AbstractDatasource<BaseOvniFranceCaseSummary> {

  protected constructor(authors = ["Chastan, Luc"], copyright = "Base OVNI France") {
    super(authors, copyright)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<BaseOvniFranceCaseSummary[]>
}
