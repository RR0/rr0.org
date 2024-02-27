import { DepartmentMessagesList } from "../../../country/region/department/DepartmentMessagesList"
import { UsaDepartementCode } from "../UsaDepartementCode"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages"

import { CityMessagesList } from "../../../country/region/department/city/CityMessagesList"

export enum NmDepartementCode {
  geneva = UsaDepartementCode.geneva
}

export interface NmDepartementMessages extends DepartmentMessages<CityMessagesList> {
}

export type NmDepartmentMessagesList = DepartmentMessagesList &
  { [key in NmDepartementCode]: NmDepartementMessages }
