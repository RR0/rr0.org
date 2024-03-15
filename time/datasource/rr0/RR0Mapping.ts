import { RR0CaseSummary } from "./RR0CaseSummary"
import { RR0CaseSummaryMapper } from "./RR0CaseSummaryMapper"
import { RR0HttpDatasource } from "./RR0HttpDatasource"

export const rr0Datasource = new RR0HttpDatasource()

export const rr0Mapper = new RR0CaseSummaryMapper(rr0Datasource.baseUrl, rr0Datasource.copyright, rr0Datasource.authors)

export const rr0Mapping = {datasource: rr0Datasource, mapper: rr0Mapper}

export const rr0SortComparator
  = (c1: RR0CaseSummary, c2: RR0CaseSummary) => !c1.time || c2.time && c1.time.isBefore(
  c2.time) ? -1 : !c2.time || c1.time.isAfter(c2.time) ? 1 : 0

export const rr0TimeAccessor = (c: RR0CaseSummary) => c.time
