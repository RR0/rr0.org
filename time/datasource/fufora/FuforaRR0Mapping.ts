import { FuforaHttpDatasource } from "./FuforaHttpDatasource"
import { FuforaCaseSummaryRR0Mapper } from "./FuforaCaseSummaryRR0Mapper"
import { cityService } from "../../../org/Cities"

export const fuforaDatasource = new FuforaHttpDatasource(new URL("https://www.fufora.fi"), "ufodb2/ufohaku.php")

export const fuforaRR0Mapper = new FuforaCaseSummaryRR0Mapper(cityService, fuforaDatasource.baseUrl,
  fuforaDatasource.copyright,
  fuforaDatasource.authors)

export const fuforaRR0Mapping = {datasource: fuforaDatasource, mapper: fuforaRR0Mapper}
