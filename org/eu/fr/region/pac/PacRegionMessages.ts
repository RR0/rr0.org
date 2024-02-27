import { PacDepartmentMessagesList } from "./PacVilleMessagesList"
import { RegionMessages } from "../../../../country/region/RegionMessages"

export interface PacRegionMessages extends RegionMessages {
  title: string
  department: PacDepartmentMessagesList
}
