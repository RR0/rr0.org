import { FuforaCaseSummary } from "./FuforaCaseSummary"
import { CaseSource } from "../CaseSource"
import { RR0SsgContext } from "../../../RR0SsgContext"

export abstract class FuforaDatasource implements CaseSource<FuforaCaseSummary> {
  readonly authors = ["FUFORA"]
  readonly copyright = "Base de données observationnelle"

  abstract fetch(context: RR0SsgContext): Promise<FuforaCaseSummary[]>
}
