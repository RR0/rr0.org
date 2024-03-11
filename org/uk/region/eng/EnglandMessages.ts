import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages"
import { EnglandDepartementCode } from "./EnglandDepartementCode"
import { sussexMessages } from "./sussex/SussexMessages"

type EnglandDepartmentMessagesList = { [key in EnglandDepartementCode]: DepartmentMessages<any> }
export const englandDepartmentsMessages: EnglandDepartmentMessagesList = {
  [EnglandDepartementCode.Sussex]: sussexMessages
}
