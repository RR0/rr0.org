import { GeipanHttpDatasource } from "./GeipanHttpDatasource"
import { GeipanCaseSummaryRR0Mapper } from "./GeipanCaseSummaryRR0Mapper"
import { GeipanFileDatasource } from "./GeipanFileDatasource"
import { cityService } from "../../../org/Cities"

import { RR0CaseMapping } from "../rr0/RR0CaseMapping"
import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions"

export const geipanHttpDatasource = new GeipanHttpDatasource(new URL("https://geipan.fr"), "fr/recherche/cas")
export const geipanFileDatasource = new GeipanFileDatasource("time/datasource/geipan/export_cas_pub_20210219111412.csv",
  "latin1")

export const geipanRR0Mapper = new GeipanCaseSummaryRR0Mapper(cityService, geipanHttpDatasource.baseUrl,
  geipanHttpDatasource.copyright, geipanHttpDatasource.authors)

export class GeipanRR0Mapping implements RR0CaseMapping<GeipanCaseSummary> {
  datasource = geipanHttpDatasource
  backupDatasource = geipanFileDatasource
  mapper = geipanRR0Mapper

  constructor(readonly actions: ChronologyReplacerActions) {
  }
}

const actions: ChronologyReplacerActions = {read: ["backup", "fetch"], write: ["backup", "pages"]}
export const geipanRR0Mapping = new GeipanRR0Mapping(actions)
