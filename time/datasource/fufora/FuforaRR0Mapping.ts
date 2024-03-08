import { FuforaDatasource } from "./FuforaDatasource"
import { FuforaCaseSummaryRR0Mapper } from "./FuforaCaseSummaryRR0Mapper"
import { cityService } from "../../../org/Cities"
import { FuforaCaseSummary } from "./FuforaCaseSummary"

export const fuforaDatasource = new FuforaDatasource()

export const fuforaRR0Mapper = new FuforaCaseSummaryRR0Mapper(cityService, fuforaDatasource.baseUrl,
  fuforaDatasource.copyright,
  fuforaDatasource.author)

export const fuforaRR0Mapping = {
  datasource: fuforaDatasource,
  mapper: fuforaRR0Mapper
}

export const fuforaSortComparator
  = (c1: FuforaCaseSummary,
     c2: FuforaCaseSummary) => c1.caseNumber < c2.caseNumber ? -1 : c1.caseNumber > c2.caseNumber ? 1 : 0

export const fuforaTimeAccessor = (c: FuforaCaseSummary) => c.dateTime
