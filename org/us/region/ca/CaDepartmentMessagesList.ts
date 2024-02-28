import { UsaDepartementCode } from "../UsaDepartementCode"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages"

export enum CaDepartementCode {
  sandiego = UsaDepartementCode.sandiego
}

export interface CaDepartementMessages extends DepartmentMessages {
}

export type CaDepartmentMessagesList = { [key in CaDepartementCode]: CaDepartementMessages }
