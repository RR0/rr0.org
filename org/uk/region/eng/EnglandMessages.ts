import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages.js"
import { EnglandDepartementCode } from "./EnglandDepartementCode.js"
import { sussexMessages } from "./sussex/SussexMessages.js"

type EnglandDepartmentMessagesList = { [key in EnglandDepartementCode]: DepartmentMessages<any> }
export const englandDepartmentsMessages: EnglandDepartmentMessagesList = {
  [EnglandDepartementCode.Sussex]: sussexMessages
}
