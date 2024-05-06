import { RR0SsgContext } from "../../../RR0SsgContext"
import { AbstractDatasource } from "../AbstractDatasource"
import { EssexPoliceCaseSummary } from "./EssexPoliceCaseSummary"

export abstract class EssexPoliceDatasource extends AbstractDatasource<EssexPoliceCaseSummary> {

  protected constructor(authors = ["Essex Police"], copyright = "STORM ufo incidents") {
    super(authors, copyright)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<EssexPoliceCaseSummary[]>
}
