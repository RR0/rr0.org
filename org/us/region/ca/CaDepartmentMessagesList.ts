import { UsaCountyCode } from "../UsaCountyCode.js"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages.js"

export enum CaDepartementCode {
  sandiego = UsaCountyCode.sandiego
}

export interface CaDepartementMessages extends DepartmentMessages {
}

export type CaDepartmentMessagesList = { [key in CaDepartementCode]: CaDepartementMessages }
