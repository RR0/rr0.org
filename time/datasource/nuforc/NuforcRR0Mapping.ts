import { NuforcRR0Mapper } from "./NuforcRR0Mapper"
import { countryService } from "../../../org/country/CountryService"
import { NuforcHttpDatasource } from "./NuforcHttpDatasource"
import { cityService } from "../../../org/Cities"
import { NuforcCaseSummary } from "./NuforcCaseSummary"

export const nuforcDatasource = new NuforcHttpDatasource()

export const nuforcRR0Mapper = new NuforcRR0Mapper(cityService, countryService, nuforcDatasource.baseUrl,
  nuforcDatasource.copyright, nuforcDatasource.author)

export const nuforcRR0Mapping = {datasource: nuforcDatasource, mapper: nuforcRR0Mapper}

export const nuforcSortComparator
  = (c1: NuforcCaseSummary,
     c2: NuforcCaseSummary) => c1.caseNumber < c2.caseNumber ? -1 : c1.caseNumber > c2.caseNumber ? 1 : 0

export const nuforcTimeAccessor = (c: NuforcCaseSummary) => c.dateTime
