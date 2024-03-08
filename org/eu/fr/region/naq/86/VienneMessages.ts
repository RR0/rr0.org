import { VienneCityCode } from "./VienneCityCode"
import { montDeMarsanMessages } from "./montigne/MontigneMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type VienneCityMessagesList = { [key in VienneCityCode]: OrganizationMessages }

const vienneCityMessages: VienneCityMessagesList = {
  [VienneCityCode.MontDeMarsan]: montDeMarsanMessages
}

export const vienneMessages = DepartmentMessages.create<VienneCityMessagesList>("Vienne", vienneCityMessages)
