import { FuforaCaseSummary } from "./FuforaCaseSummary.js"
import { Datasource } from "../Datasource.js"
import { RR0SsgContext } from "../../../RR0SsgContext.js"

export abstract class FuforaDatasource implements Datasource<FuforaCaseSummary> {
  readonly authors = ["FUFORA"]
  readonly copyright = "Base de données observationnelle"

  abstract fetch(context: RR0SsgContext): Promise<FuforaCaseSummary[]>
}
