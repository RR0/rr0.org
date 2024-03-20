import { VosgesCityCode } from "./VosgesCityCode"
import { epinalMessages } from "./Epinal/EpinalMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { anglemontMessages } from "./Anglemont/AnglemontMessages"

export const vosgesMessages = DepartmentMessages.create("Vosges", {
  [VosgesCityCode.Anglemont]: anglemontMessages,
  [VosgesCityCode.Epinal]: epinalMessages
})
