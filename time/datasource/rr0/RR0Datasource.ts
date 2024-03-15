import { CaseSource } from "../CaseSource"
import { RR0CaseSummary } from "./RR0CaseSummary"
import { RR0SsgContext } from "../../../RR0SsgContext"

export abstract class RR0Datasource implements CaseSource<RR0CaseSummary> {
  readonly authors = ["Jérôme Beau"]
  readonly copyright = "RR0"

  abstract getAll(context: RR0SsgContext): Promise<RR0CaseSummary[]>
}
