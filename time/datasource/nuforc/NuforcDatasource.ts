import { NuforcCaseSummary } from "./NuforcCaseSummary"
import { RR0SsgContext } from "../../../RR0SsgContext"
import { AbstractCaseSource } from "../AbstractCaseSource"

export abstract class NuforcDatasource extends AbstractCaseSource<NuforcCaseSummary> {

  protected constructor(authors: string[] = ["NUFORC"], copyright = "Online Database") {
    super(authors, copyright)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<NuforcCaseSummary[]>
}
