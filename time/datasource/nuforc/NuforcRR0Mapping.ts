import { NuforcRR0Mapper } from "./NuforcRR0Mapper"
import { regionService } from "../../../org/country/region/RegionService"
import { countryService } from "../../../org/country/CountryService"
import { NuforcCaseSource } from "./NuforcCaseSource"
import { cityService } from "../../../org/Cities"

export const nuforcDatasource = new NuforcCaseSource()

export const nuforcRR0Mapper = new NuforcRR0Mapper(
  cityService, regionService, countryService,
  nuforcDatasource.baseUrl, nuforcDatasource.copyright, nuforcDatasource.author
)

export const nuforcRR0Mapping = {
  datasource: nuforcDatasource,
  mapper: nuforcRR0Mapper
}
