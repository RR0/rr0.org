import { RR0SsgContext } from "../../../RR0SsgContext.js"
import { AbstractDatasource } from "../AbstractDatasource.js"
import { EssexPoliceCaseSummary } from "./EssexPoliceCaseSummary.js"

export abstract class EssexPoliceDatasource extends AbstractDatasource<EssexPoliceCaseSummary> {

  protected constructor(authors = ["Essex Police"], copyright = "STORM ufo incidents") {
    super(authors, copyright)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<EssexPoliceCaseSummary[]>
}
