import { RR0HttpDatasource } from "./Rr0HttpDatasource"
import { cityService } from "../../../org/Cities"
import { RR0CaseSummary } from "./RR0CaseSummary"
import { RR0CaseSummaryMapper } from "./RR0CaseSummaryMapper"

export const rr0Datasource = new RR0HttpDatasource()

export const rr0Mapper = new RR0CaseSummaryMapper(cityService, rr0Datasource.baseUrl,
  rr0Datasource.copyright,
  rr0Datasource.author)

export const rr0Mapping = {datasource: rr0Datasource, mapper: rr0Mapper}

export const rr0SortComparator
  = (c1: RR0CaseSummary,
     c2: RR0CaseSummary) => c1.time < c2.time ? -1 : c1.time > c2.time ? 1 : 0

export const rr0TimeAccessor = (c: RR0CaseSummary) => c.time
