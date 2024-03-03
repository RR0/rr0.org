import { NuforcRR0Mapper } from "./NuforcRR0Mapper"
import { countryService } from "../../../org/country/CountryService"
import { NuforcDatasource } from "./NuforcDatasource"
import { cityService } from "../../../org/Cities"
import { NuforcCase } from "./NuforcCase"

export const nuforcDatasource = new NuforcDatasource()

export const nuforcRR0Mapper = new NuforcRR0Mapper(cityService, countryService, nuforcDatasource.baseUrl,
  nuforcDatasource.copyright, nuforcDatasource.author)

export const nuforcRR0Mapping = {
  datasource: nuforcDatasource,
  mapper: nuforcRR0Mapper
}

export const nuforcSortComparator
  = (c1: NuforcCase, c2: NuforcCase) => c1.caseNumber < c2.caseNumber ? -1 : c1.caseNumber > c2.caseNumber ? 1 : 0
