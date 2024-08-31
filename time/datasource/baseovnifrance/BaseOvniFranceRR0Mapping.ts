import { BaseOvniFranceCaseSummaryRR0Mapper } from "./BaseOvniFranceCaseSummaryRR0Mapper"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary"
import { BaseOvniFranceHttpDatasource } from "./BaseOvniFranceHttpDatasource"
import { departmentService } from "../../../org/country/region/department/DepartmentService"
import { cityService } from "../../../org/Cities"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions"

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
