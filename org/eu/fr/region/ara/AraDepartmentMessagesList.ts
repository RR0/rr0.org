import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { FranceDepartementCode } from "../FranceDepartementCode"
import { DepartmentMessagesList } from "../../../../country/region/department/DepartmentMessagesList"
import { CityMessagesList } from "../../../../country/region/department/city/CityMessagesList"

export enum AraDepartementCode {
  Rhone = FranceDepartementCode.Rhone
}

export interface AraDepartementMessages extends DepartmentMessages<CityMessagesList> {
}

export type AraDepartmentMessagesList = DepartmentMessagesList &
  { [key in AraDepartementCode]: AraDepartementMessages }
