import { BaseOvniFranceCaseSummaryRR0Mapper } from "./BaseOvniFranceCaseSummaryRR0Mapper.js"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary.js"
import { BaseOvniFranceHttpDatasource } from "./BaseOvniFranceHttpDatasource.js"
import { departmentService } from "../../../org/country/region/department/DepartmentService.js"
import { cityService } from "../../../org/Cities.js"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"

export const baseOvniFranceDatasource = new BaseOvniFranceHttpDatasource()

export const baseOvniFranceRR0Mapper = new BaseOvniFranceCaseSummaryRR0Mapper(
  departmentService, cityService,
  baseOvniFranceDatasource.baseUrl, baseOvniFranceDatasource.copyright, baseOvniFranceDatasource.authors
)

const actions: ChronologyReplacerActions = {read: ["fetch"], write: ["backup"]}
export const baseOvniFranceRR0Mapping: RR0CaseMapping<BaseOvniFranceCaseSummary> = {
  datasource: baseOvniFranceDatasource,
  mapper: baseOvniFranceRR0Mapper,
  actions
}
