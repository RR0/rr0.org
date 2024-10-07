import { UrecatRR0Mapper } from "./UrecatRR0Mapper.js"
import { UrecatHttpDatasource } from "./UrecatHttpDatasource.js"
import { cityService } from "../../../org/Cities.js"
import { countryService } from "../../../org/country/CountryService.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"

export const urecatDatasource = new UrecatHttpDatasource(new URL("https://ufologie.patrickgross.org"), "ce3")

export const urecatRR0Mapper = new UrecatRR0Mapper(cityService, countryService, urecatDatasource.baseUrl,
  urecatDatasource.copyright, urecatDatasource.authors)

const actions: ChronologyReplacerActions = {read: ["fetch"], write: ["backup"]}
export const urecatRR0Mapping = {datasource: urecatDatasource, mapper: urecatRR0Mapper, actions}
