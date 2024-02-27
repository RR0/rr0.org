import { NuforcRR0Mapper } from "./NuforcRR0Mapper"
import { regionService } from "../../../org/country/region/RegionService"
import { countryService } from "../../../org/country/CountryService"
import { NuforcCaseSource } from "./NuforcCaseSource"
import { cityService } from "../../../org/Cities"
import { NuforcCase } from "./NuforcCase"

export const nuforcDatasource = new NuforcCaseSource()

export const nuforcRR0Mapper = new NuforcRR0Mapper(
  cityService, regionService, countryService,
  nuforcDatasource.baseUrl, nuforcDatasource.copyright, nuforcDatasource.author
)

export const nuforcRR0Mapping = {
  datasource: nuforcDatasource,
  mapper: nuforcRR0Mapper
}

export const nuforcSortComparator
  = (c1: NuforcCase, c2: NuforcCase) => c1.caseNumber < c2.caseNumber ? -1 : c1.caseNumber > c2.caseNumber ? 1 : 0
