import { DepartmentMessagesList } from "../../../country/region/department/DepartmentMessagesList"
import { UsaDepartementCode } from "../UsaDepartementCode"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages"

export enum CaDepartementCode {
  sandiego = UsaDepartementCode.sandiego
}

export interface CaDepartementMessages extends DepartmentMessages {
}

export type CaDepartmentMessagesList = DepartmentMessagesList &
  { [key in CaDepartementCode]: CaDepartementMessages }
