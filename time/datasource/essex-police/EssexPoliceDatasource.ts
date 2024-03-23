import { RR0SsgContext } from "../../../RR0SsgContext"
import { AbstractCaseSource } from "../AbstractCaseSource"
import { EssexPoliceCaseSummary } from "./EssexPoliceCaseSummary"

export abstract class EssexPoliceDatasource extends AbstractCaseSource<EssexPoliceCaseSummary> {

  protected constructor(authors = ["Essex Police"], copyright = "STORM ufo incidents") {
    super(authors, copyright)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<EssexPoliceCaseSummary[]>
}
