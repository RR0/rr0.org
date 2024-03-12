import { UsaCountyCode } from "../UsaCountyCode"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages"

export enum CaDepartementCode {
  sandiego = UsaCountyCode.sandiego
}

export interface CaDepartementMessages extends DepartmentMessages {
}

export type CaDepartmentMessagesList = { [key in CaDepartementCode]: CaDepartementMessages }
