import { GeipanHttpDatasource } from "./GeipanHttpDatasource"
import { cityService } from "../../../org/Cities"
import { GeipanCaseSummaryRR0Mapper } from "./GeipanCaseSummaryRR0Mapper"
import { departmentService } from "../../../org/country/region/department/DepartmentService"
import { GeipanFileDatasource } from "./GeipanFileDatasource"
import { regionService } from "../../../org/country/region/RegionService"

export const geipanHttpDatasource = new GeipanHttpDatasource("https://geipan.fr", "fr/recherche/cas")
export const geipanFileDatasource = new GeipanFileDatasource("time/datasource/geipan/export_cas_pub_20210219111412.csv")

export const geipanRR0Mapper = new GeipanCaseSummaryRR0Mapper(
  cityService, departmentService, regionService,
  geipanHttpDatasource.baseUrl, geipanHttpDatasource.copyright, geipanHttpDatasource.authors
)

export const geipanRR0Mapping = {datasource: geipanFileDatasource, mapper: geipanRR0Mapper}
