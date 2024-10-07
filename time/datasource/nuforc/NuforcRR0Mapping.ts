import { NuforcRR0Mapper } from "./NuforcRR0Mapper.js"
import { NuforcHttpDatasource } from "./NuforcHttpDatasource.js"
import { cityService } from "../../../org/Cities.js"
import { countryService } from "../../../org/country/CountryService.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"

export const nuforcDatasource = new NuforcHttpDatasource()

export const nuforcRR0Mapper = new NuforcRR0Mapper(cityService, countryService,
  nuforcDatasource.baseUrl.href, nuforcDatasource.copyright, nuforcDatasource.authors)

const actions: ChronologyReplacerActions = {read: ["fetch"], write: ["backup"]}
export const nuforcRR0Mapping = {datasource: nuforcDatasource, mapper: nuforcRR0Mapper, actions}
