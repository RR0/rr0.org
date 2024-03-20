import { VosgesCityCode } from "./VosgesCityCode"
import { epinalMessages } from "./Epinal/EpinalMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export const vosgesMessages = DepartmentMessages.create("Vosges", {
  [VosgesCityCode.Epinal]: epinalMessages
})
