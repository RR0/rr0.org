import { EssexPoliceHttpDatasource } from "./EssexPoliceHttpDatasource"
import { cityService } from "../../../org/Cities"
import { EssexPoliceCaseSummaryRR0Mapper } from "./EssexPoliceCaseSummaryRR0Mapper"

export const essexPoliceHttpDatasource = new EssexPoliceHttpDatasource("https://www.essex.police.uk",
  "foi-ai/essex-police/other-information/previous-foi-requests/ufo-reports-2018-to-2023/")

export const essexPoliceCaseRR0Mapper = new EssexPoliceCaseSummaryRR0Mapper(cityService,
  essexPoliceHttpDatasource.baseUrl,
  essexPoliceHttpDatasource.copyright, essexPoliceHttpDatasource.authors)

export const essexPoliceRR0Mapping = {datasource: essexPoliceHttpDatasource, mapper: essexPoliceCaseRR0Mapper}
