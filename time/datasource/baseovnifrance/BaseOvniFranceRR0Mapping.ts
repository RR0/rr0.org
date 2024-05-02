import { BaseOvniFranceCaseSummaryRR0Mapper } from "./BaseOvniFranceCaseSummaryRR0Mapper"
import { RR0CaseMapping } from "../ChronologyReplacer"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary"
import { BaseOvniFranceHttpDatasource } from "./BaseOvniFranceHttpDatasource"
import { departmentService } from "../../../org/country/region/department/DepartmentService"
import { cityService } from "../../../org/Cities"

export const baseOvniFranceDatasource = new BaseOvniFranceHttpDatasource()

export const baseOvniFranceRR0Mapper = new BaseOvniFranceCaseSummaryRR0Mapper(
  departmentService, cityService,
  baseOvniFranceDatasource.baseUrl, baseOvniFranceDatasource.copyright, baseOvniFranceDatasource.authors
)

export const baseOvniFranceRR0Mapping: RR0CaseMapping<BaseOvniFranceCaseSummary> = {
  datasource: baseOvniFranceDatasource,
  mapper: baseOvniFranceRR0Mapper
}
