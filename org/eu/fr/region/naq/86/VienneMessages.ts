import { VienneCityCode } from "./VienneCityCode.js"
import { magneMessages } from "./Magne/MagneMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

type DepMessages = { [key in VienneCityCode]: OrganizationMessages }
export const vienneMessages = DepartmentMessages.create<DepMessages>("Vienne", {
  [VienneCityCode.Magne]: magneMessages
})
