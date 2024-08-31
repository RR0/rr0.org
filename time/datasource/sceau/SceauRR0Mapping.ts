import { SceauHttpDatasource } from "./SceauHttpDatasource"
import { cityService } from "../../../org/Cities"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping"
import { SceauCaseSummary } from "./SceauCaseSummary"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions"
import { SceauCaseSummaryRR0Mapper } from "./SceauCaseSummaryRR0Mapper"

export const sceauDatasource = new SceauHttpDatasource(new URL("https://sceau-archives-ovni.org"))

export const sceauRR0Mapper = new SceauCaseSummaryRR0Mapper(cityService, sceauDatasource.baseUrl,
  sceauDatasource.copyright,
  sceauDatasource.authors)

const actions: ChronologyReplacerActions = {read: ["fetch"], write: ["backup"]}
export const sceauRR0Mapping: RR0CaseMapping<SceauCaseSummary> = {
  datasource: sceauDatasource,
  mapper: sceauRR0Mapper,
  actions
}
