import { CaseSource } from "../CaseSource"
import { RR0CaseSummary } from "../../RR0CaseSummary"

export abstract class RR0Datasource implements CaseSource<RR0CaseSummary> {
  readonly author = "Jérôme Beau"
  readonly copyright = "RR0"

}
