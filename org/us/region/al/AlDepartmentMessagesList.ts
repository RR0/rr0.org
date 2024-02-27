import { DepartmentMessagesList } from "../../../country/region/department/DepartmentMessagesList"
import { UsaDepartementCode } from "../UsaDepartementCode"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages"

export enum AlDepartementCode {
  geneva = UsaDepartementCode.geneva
}

export interface AlDepartementMessages extends DepartmentMessages {
}

export type AlDepartmentMessagesList = DepartmentMessagesList &
  { [key in AlDepartementCode]: AlDepartementMessages }
