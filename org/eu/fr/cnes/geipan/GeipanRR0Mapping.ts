import { GeipanHttpDatasource } from "./GeipanHttpDatasource.js"
import { GeipanCaseSummaryRR0Mapper } from "./GeipanCaseSummaryRR0Mapper.js"
import { GeipanFileDatasource } from "./GeipanFileDatasource.js"

import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import { cityService } from "../../../../Cities.js"
import { RR0CaseMapping } from "../../../../../time/datasource/rr0/RR0CaseMapping.js"
import { ChronologyReplacerActions } from "../../../../../time/datasource/ChronologyReplacerActions.js"

export const geipanHttpDatasource = new GeipanHttpDatasource(new URL("https://geipan.fr"), "fr/recherche/cas")
export const geipanFileDatasource = new GeipanFileDatasource("org/eu/fr/cnes/geipan/export_cas_pub_20210219111412.csv",
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
