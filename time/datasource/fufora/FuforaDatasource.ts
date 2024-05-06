import { FuforaCaseSummary } from "./FuforaCaseSummary"
import { Datasource } from "../Datasource"
import { RR0SsgContext } from "../../../RR0SsgContext"

export abstract class FuforaDatasource implements Datasource<FuforaCaseSummary> {
  readonly authors = ["FUFORA"]
  readonly copyright = "Base de données observationnelle"

  abstract fetch(context: RR0SsgContext): Promise<FuforaCaseSummary[]>
}
