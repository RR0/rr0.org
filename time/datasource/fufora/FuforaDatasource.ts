import { FuforaCaseSummary } from "./FuforaCaseSummary"
import { CaseSource } from "../CaseSource"

export abstract class FuforaDatasource implements CaseSource<FuforaCaseSummary> {
  readonly author = "FUFORA"
  readonly copyright = "Base de données observationnelle"
}
