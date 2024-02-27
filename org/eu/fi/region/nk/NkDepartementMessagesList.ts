import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { FinlandDepartementCode } from "../FinlandDepartementCode"
import { CityMessagesList } from "../../../../country/region/department/city/CityMessagesList"

export enum NkDepartementCode {
  pk = FinlandDepartementCode.pk
}

export interface NkDepartementMessages extends DepartmentMessages {
  city: CityMessagesList
}

export type NkDepartementMessagesList
  = { [key in NkDepartementCode]: NkDepartementMessages }
