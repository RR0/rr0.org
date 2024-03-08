import { GeipanHttpDatasource } from "./GeipanHttpDatasource"
import { cityService } from "../../../org/Cities"
import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { GeipanCaseSummaryRR0Mapper } from "./GeipanCaseSummaryRR0Mapper"
import { departmentService } from "../../../org/country/region/department/DepartmentService"
import { GeipanFileDatasource } from "./GeipanFileDatasource"

export const geipanHttpDatasource = new GeipanHttpDatasource("https://geipan.fr", "fr/recherche/cas")
export const geipanFileDatasource = new GeipanFileDatasource("time/datasource/geipan/export_cas_pub_20210219111412.csv")

export const geipanRR0Mapper = new GeipanCaseSummaryRR0Mapper(
  cityService, departmentService,
  geipanHttpDatasource.baseUrl, geipanHttpDatasource.copyright, geipanHttpDatasource.author
)

export const geipanRR0Mapping = {datasource: geipanFileDatasource, mapper: geipanRR0Mapper}

export const geipanSortComparator
  = (c1: GeipanCaseSummary,
     c2: GeipanCaseSummary) => c1.caseNumber < c2.caseNumber ? -1 : c1.caseNumber > c2.caseNumber ? 1 : 0

export const geipanTimeAccessor = (c: GeipanCaseSummary) => c.dateTime
