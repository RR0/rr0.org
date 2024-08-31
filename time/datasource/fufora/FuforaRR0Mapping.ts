import { FuforaHttpDatasource } from "./FuforaHttpDatasource"
import { FuforaCaseSummaryRR0Mapper } from "./FuforaCaseSummaryRR0Mapper"
import { cityService } from "../../../org/Cities"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping"
import { FuforaCaseSummary } from "./FuforaCaseSummary"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions"

export const fuforaDatasource = new FuforaHttpDatasource(new URL("https://www.fufora.fi"), "ufodb2/ufohaku.php")

export const fuforaRR0Mapper = new FuforaCaseSummaryRR0Mapper(cityService, fuforaDatasource.baseUrl,
  fuforaDatasource.copyright,
  fuforaDatasource.authors)

const actions: ChronologyReplacerActions = {read: ["fetch"], write: ["backup"]}
export const fuforaRR0Mapping: RR0CaseMapping<FuforaCaseSummary> = {
  datasource: fuforaDatasource,
  mapper: fuforaRR0Mapper,
  actions
}
