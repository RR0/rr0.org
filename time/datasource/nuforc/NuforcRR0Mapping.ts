import { NuforcRR0Mapper } from "./NuforcRR0Mapper"
import { countryService } from "../../../org/country/CountryService"
import { NuforcHttpDatasource } from "./NuforcHttpDatasource"
import { cityService } from "../../../org/Cities"

export const nuforcDatasource = new NuforcHttpDatasource()

export const nuforcRR0Mapper = new NuforcRR0Mapper(cityService, countryService,
  nuforcDatasource.baseUrl, nuforcDatasource.copyright, nuforcDatasource.authors)

export const nuforcRR0Mapping = {datasource: nuforcDatasource, mapper: nuforcRR0Mapper}
