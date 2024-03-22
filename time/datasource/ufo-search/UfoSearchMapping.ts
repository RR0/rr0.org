import { UfoSearchHttpDatasource } from "./UfoSearchHttpDatasource"
import { UfoSearchFileDatasource } from "./UfoSearchFileDatasource"

export const ufoSearchHttpDatasource = new UfoSearchHttpDatasource("https://www.ufo-search.com", "timeline/search.html")
export const ufoSearchFileDatasource = new UfoSearchFileDatasource("time/datasource/ufo-search/majestic.json")
