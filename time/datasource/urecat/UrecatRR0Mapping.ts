import { UrecatRR0Mapper } from "./UrecatRR0Mapper"
import { countryService } from "../../../org/country/CountryService"
import { UrecatHttpDatasource } from "./UrecatHttpDatasource"
import { cityService } from "../../../org/Cities"

export const urecatDatasource = new UrecatHttpDatasource()

export const urecatRR0Mapper = new UrecatRR0Mapper(cityService, countryService, urecatDatasource.baseUrl,
  urecatDatasource.copyright, urecatDatasource.authors)

export const urecatRR0Mapping = {datasource: urecatDatasource, mapper: urecatRR0Mapper}
