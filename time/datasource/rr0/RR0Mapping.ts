import { RR0CaseSummaryMapper } from "./RR0CaseSummaryMapper"
import { RR0HttpDatasource } from "./RR0HttpDatasource"
import { cityService } from "../../../org/Cities"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions"
import { RR0CaseMapping } from "./RR0CaseMapping"
import { RR0CaseSummary } from "./RR0CaseSummary"
import { RR0FileDatasource } from "./RR0FileDatasource"

export const rr0HttpDatasource = new RR0HttpDatasource(new URL("https://rr0.org"), "time", cityService)
export const rr0FileDatasource = new RR0FileDatasource()

export const rr0Mapper = new RR0CaseSummaryMapper(rr0HttpDatasource.baseUrl, rr0HttpDatasource.copyright,
  rr0HttpDatasource.authors)

export class RR0Mapping implements RR0CaseMapping<RR0CaseSummary> {

  constructor(
    readonly actions: ChronologyReplacerActions, readonly datasource = rr0HttpDatasource,
    readonly mapper = rr0Mapper, readonly backupDatasource = rr0FileDatasource
  ) {
  }
}
