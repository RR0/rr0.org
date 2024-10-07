import { SceauHttpDatasource } from "./SceauHttpDatasource.js"
import { cityService } from "../../../org/Cities.js"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping.js"
import { SceauCaseSummary } from "./SceauCaseSummary.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"
import { SceauCaseSummaryRR0Mapper } from "./SceauCaseSummaryRR0Mapper.js"

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
