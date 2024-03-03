import { GeipanDatasource } from "./GeipanDatasource"
import { cityService } from "../../../org/Cities"
import { GeipanCase } from "./GeipanCase"
import { GeipanRR0Mapper } from "./GeipanRR0Mapper"
import { departmentService } from "../../../org/country/region/department/DepartmentService"

export const geipanDatasource = new GeipanDatasource()

export const geipanRR0Mapper = new GeipanRR0Mapper(
  cityService, departmentService,
  geipanDatasource.baseUrl, geipanDatasource.copyright, geipanDatasource.author
)

export const geipanRR0Mapping = {
  datasource: geipanDatasource,
  mapper: geipanRR0Mapper
}

export const geipanSortComparator
  = (c1: GeipanCase, c2: GeipanCase) => c1.caseNumber < c2.caseNumber ? -1 : c1.caseNumber > c2.caseNumber ? 1 : 0
