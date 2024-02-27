import { NaqDepartmentMessagesList } from "./NaqDepartmentMessagesList"
import { CityMessages } from "../../../../country/region/department/city/CityMessages"
import { RegionMessages } from "../../../../country/region/RegionMessages"
import { CreuseCityCode } from "./23/CreuseCityCode"

export type CreuseCityMessagesList = {
  [key in CreuseCityCode]: CityMessages
}

export interface NaqRegionMessages extends RegionMessages {
  title: string
  department: NaqDepartmentMessagesList
}
