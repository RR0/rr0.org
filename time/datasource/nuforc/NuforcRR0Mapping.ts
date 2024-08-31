import { NuforcRR0Mapper } from "./NuforcRR0Mapper"
import { NuforcHttpDatasource } from "./NuforcHttpDatasource"
import { cityService } from "../../../org/Cities"
import { countryService } from "../../../org/country/CountryService"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions"

export const nuforcDatasource = new NuforcHttpDatasource()

export const nuforcRR0Mapper = new NuforcRR0Mapper(cityService, countryService,
  nuforcDatasource.baseUrl.href, nuforcDatasource.copyright, nuforcDatasource.authors)

const actions: ChronologyReplacerActions = {read: ["fetch"], write: ["backup"]}
export const nuforcRR0Mapping = {datasource: nuforcDatasource, mapper: nuforcRR0Mapper, actions}
