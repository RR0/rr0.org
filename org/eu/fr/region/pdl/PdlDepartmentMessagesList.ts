import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { DepartmentMessagesList } from "../../../../country/region/department/DepartmentMessagesList"
import { FranceDepartementCode } from "../FranceDepartementCode"
import { CityMessagesList } from "../../../../country/region/department/city/CityMessagesList"

export enum PaysDeLaLoireDepartementCode {
  Sarthe = FranceDepartementCode.Sarthe
}

export interface PdlDepartementMessages extends DepartmentMessages {
  city: CityMessagesList
}

export type PdlDepartmentMessagesList
  = DepartmentMessagesList & { [key in PaysDeLaLoireDepartementCode]: PdlDepartementMessages }
