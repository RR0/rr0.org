import { UsaDepartementCode } from "../UsaDepartementCode"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages"

export enum AlDepartementCode {
  geneva = UsaDepartementCode.geneva
}

export interface AlDepartementMessages extends DepartmentMessages {
}

export type AlDepartmentMessagesList = { [key in AlDepartementCode]: AlDepartementMessages }
