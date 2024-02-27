import { FuforaCaseSource } from "./FuforaCaseSource"
import { FuforaRR0Mapper } from "./FuforaRR0Mapper"
import { cityService } from "../../../org/Cities"

export const fuforaDatasource = new FuforaCaseSource()

export const fuforaRR0Mapper = new FuforaRR0Mapper(cityService, fuforaDatasource.baseUrl, fuforaDatasource.copyright,
  fuforaDatasource.author)

export const fuforaRR0Mapping = {
  datasource: fuforaDatasource,
  mapper: fuforaRR0Mapper
}
