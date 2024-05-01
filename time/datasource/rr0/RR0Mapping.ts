import { RR0CaseSummaryMapper } from "./RR0CaseSummaryMapper"
import { RR0HttpDatasource } from "./RR0HttpDatasource"
import { cityService } from "/org/Cities"

export const rr0Datasource = new RR0HttpDatasource(new URL("https://rr0.org"), "time", cityService)

export const rr0Mapper = new RR0CaseSummaryMapper(rr0Datasource.baseUrl, rr0Datasource.copyright, rr0Datasource.authors)

export const rr0Mapping = {datasource: rr0Datasource, mapper: rr0Mapper}
