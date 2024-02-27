import { AraDepartmentMessagesList } from "./AraDepartmentMessagesList"
import { RegionMessages } from "../../../../country/region/RegionMessages"

export interface AraRegionMessages extends RegionMessages {
  title: string
  department: AraDepartmentMessagesList
}
