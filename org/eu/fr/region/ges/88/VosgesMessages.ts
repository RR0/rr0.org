import { VosgesCityCode } from "./VosgesCityCode.js"
import { epinalMessages } from "./Epinal/EpinalMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { anglemontMessages } from "./Anglemont/AnglemontMessages.js"

export const vosgesMessages = DepartmentMessages.create("Vosges", {
  [VosgesCityCode.Anglemont]: anglemontMessages,
  [VosgesCityCode.Epinal]: epinalMessages
})
