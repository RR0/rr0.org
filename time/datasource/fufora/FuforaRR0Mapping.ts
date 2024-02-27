import { FuforaCaseSource } from "./FuforaCaseSource"
import { FuforaRR0Mapper } from "./FuforaRR0Mapper"
import { cityService } from "../../../org/Cities"
import { FuforaCase } from "./FuforaCase"

export const fuforaDatasource = new FuforaCaseSource()

export const fuforaRR0Mapper = new FuforaRR0Mapper(cityService, fuforaDatasource.baseUrl, fuforaDatasource.copyright,
  fuforaDatasource.author)

export const fuforaRR0Mapping = {
  datasource: fuforaDatasource,
  mapper: fuforaRR0Mapper
}

export const fuforaSortComparator
  = (c1: FuforaCase, c2: FuforaCase) => c1.caseNumber < c2.caseNumber ? -1 : c1.caseNumber > c2.caseNumber ? 1 : 0
