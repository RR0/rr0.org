import { PdlDepartmentMessagesList } from "./PdlDepartmentMessagesList"
import { RegionMessages } from "../../../../country/region/RegionMessages"

export interface PdlRegionMessages extends RegionMessages {
  title: string
  department: PdlDepartmentMessagesList
}
