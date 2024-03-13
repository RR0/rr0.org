import { UrecatRR0Mapper } from "./UrecatRR0Mapper"
import { countryService } from "../../../org/country/CountryService"
import { UrecatHttpDatasource } from "./UrecatHttpDatasource"
import { cityService } from "../../../org/Cities"
import { UrecatCase } from "./UrecatCase"

export const urecatDatasource = new UrecatHttpDatasource()

export const urecatRR0Mapper = new UrecatRR0Mapper(cityService, countryService, urecatDatasource.baseUrl,
  urecatDatasource.copyright, urecatDatasource.author)

export const urecatRR0Mapping = {datasource: urecatDatasource, mapper: urecatRR0Mapper}

export const urecatSortComparator
  = (c1: UrecatCase, c2: UrecatCase) => c1.url < c2.url ? -1 : c1.url > c2.url ? 1 : 0

export const urecatTimeAccessor = (c: UrecatCase) => c.basicInfo.base.sightingDate
