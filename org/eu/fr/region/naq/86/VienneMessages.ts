import { VienneCityCode } from "./VienneCityCode"
import { magneMessages } from "./Magne/MagneMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type DepMessages = { [key in VienneCityCode]: OrganizationMessages }
export const vienneMessages = DepartmentMessages.create<DepMessages>("Vienne", {
  [VienneCityCode.Magne]: magneMessages
})
