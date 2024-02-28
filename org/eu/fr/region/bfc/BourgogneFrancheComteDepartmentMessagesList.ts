import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { DepartmentMessagesList } from "../../../../country/region/department/DepartmentMessagesList"
import { BourgogneFrancheComteDepartementCode } from "./BourgogneFrancheComteDepartementCode"

export type BourgogneFrancheComteDepartmentMessagesList = DepartmentMessagesList &
  { [key in BourgogneFrancheComteDepartementCode]: DepartmentMessages }
