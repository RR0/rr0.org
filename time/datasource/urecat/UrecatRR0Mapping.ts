import { UrecatRR0Mapper } from "./UrecatRR0Mapper"
import { UrecatHttpDatasource } from "./UrecatHttpDatasource"
import { cityService } from "../../../org/Cities"
import { countryService } from "../../../org/country/CountryService"

export const urecatDatasource = new UrecatHttpDatasource(new URL("https://ufologie.patrickgross.org"), "ce3")

export const urecatRR0Mapper = new UrecatRR0Mapper(cityService, countryService, urecatDatasource.baseUrl,
  urecatDatasource.copyright, urecatDatasource.authors)

export const urecatRR0Mapping = {datasource: urecatDatasource, mapper: urecatRR0Mapper}
