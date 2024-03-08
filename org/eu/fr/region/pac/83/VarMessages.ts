import { VarCityCode } from "./VarCityCode"
import { foxAmphouxMessages } from "./foxamphoux/FoxAmphouxMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export type VarCityList<T> = { [key in VarCityCode]: T }

export const varCityMessages: VarCityList<OrganizationMessages> = {
  [VarCityCode.FoxAmphoux]: foxAmphouxMessages
}

export const varMessages = DepartmentMessages.create<VarCityList<OrganizationMessages>>("Var", varCityMessages)
