import { GeipanDatasource } from "./GeipanDatasource"
import { cityService } from "../../../org/Cities"
import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { GeipanCaseSummaryRR0Mapper } from "./GeipanCaseSummaryRR0Mapper"
import { departmentService } from "../../../org/country/region/department/DepartmentService"

export const geipanDatasource = new GeipanDatasource()

export const geipanRR0Mapper = new GeipanCaseSummaryRR0Mapper(
  cityService, departmentService,
  geipanDatasource.baseUrl, geipanDatasource.copyright, geipanDatasource.author
)

export const geipanRR0Mapping = {
  datasource: geipanDatasource,
  mapper: geipanRR0Mapper
}

export const geipanSortComparator
  = (c1: GeipanCaseSummary,
     c2: GeipanCaseSummary) => c1.caseNumber < c2.caseNumber ? -1 : c1.caseNumber > c2.caseNumber ? 1 : 0

export const geipanTimeAccessor = (c: GeipanCaseSummary) => c.dateTime
