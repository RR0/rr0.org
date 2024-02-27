import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { NaqDepartmentCode } from "./NaqDepartmentCode"
import { CityMessagesList } from "../../../../country/region/department/city/CityMessagesList"

export interface NaqDepartementMessages extends DepartmentMessages {
  city: CityMessagesList
}

export type NaqDepartmentMessagesList
  = { [key in NaqDepartmentCode]: NaqDepartementMessages }
