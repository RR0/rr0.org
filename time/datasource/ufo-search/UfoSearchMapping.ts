import { UfoSearchHttpDatasource } from "./UfoSearchHttpDatasource"
import { UfoSearchFileDatasource } from "./UfoSearchFileDatasource"
import { UfoSearchCaseRR0Mapper } from "./UfoSearchCaseRR0Mapper"
import { cityService } from "../../../org/Cities"

export const ufoSearchHttpDatasource = new UfoSearchHttpDatasource("https://www.ufo-search.com", "timeline/search.html")
export const ufoSearchFileDatasource = new UfoSearchFileDatasource("time/datasource/ufo-search/majestic.json")

export const ufoSearchCaseRR0Mapper = new UfoSearchCaseRR0Mapper(cityService, ufoSearchHttpDatasource.baseUrl,
  ufoSearchHttpDatasource.copyright, ufoSearchHttpDatasource.authors)

export const ufoSearchRR0Mapping = {datasource: ufoSearchHttpDatasource, mapper: ufoSearchCaseRR0Mapper}
