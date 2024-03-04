import { BaseOvniFranceRR0Mapper } from "./BaseOvniFranceRR0Mapper"
import { departmentService } from "../../../org/country/region/department/DepartmentService"
import { RR0CaseMapping } from "../ChronologyReplacer"
import { BaseOvniFranceCase } from "./BaseOvniFranceCase"
import { BaseOvniFranceDatasource } from "./BaseOvniFranceDatasource"
import { cityService } from "../../../org/Cities"

export const baseOvniFranceDatasource = new BaseOvniFranceDatasource()

export const baseOvniFranceRR0Mapper = new BaseOvniFranceRR0Mapper(
  departmentService, cityService,
  baseOvniFranceDatasource.baseUrl, baseOvniFranceDatasource.copyright, baseOvniFranceDatasource.author
)

export const baseOvniFranceRR0Mapping: RR0CaseMapping<BaseOvniFranceCase> = {
  datasource: baseOvniFranceDatasource,
  mapper: baseOvniFranceRR0Mapper
}

export const baseOvniFranceSortComparator
  = (c1: BaseOvniFranceCase,
     c2: BaseOvniFranceCase) => c1.caseNumber < c2.caseNumber ? -1 : c1.caseNumber > c2.caseNumber ? 1 : 0

export const baseOvniFranceTimeAccessor = (c: BaseOvniFranceCase) => c.dateTime
