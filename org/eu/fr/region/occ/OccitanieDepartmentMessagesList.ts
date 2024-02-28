import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { DepartmentMessagesList } from "../../../../country/region/department/DepartmentMessagesList"
import { OccitanieDepartementCode } from "./OccitanieDepartementCode"

export interface GersDepartementMessages extends DepartmentMessages {
}

export type OccitanieDepartmentMessagesList = DepartmentMessagesList &
  { [key in OccitanieDepartementCode]: GersDepartementMessages }
