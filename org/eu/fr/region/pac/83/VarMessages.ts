import { VarCityCode } from "./VarCityCode"
import { foxAmphouxMessages } from "./foxamphoux/FoxAmphouxMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { carcesMessages } from "./carces/CarcesMessages"

type VarCityList<T> = { [key in VarCityCode]: T }
const varCityMessages: VarCityList<OrganizationMessages> = {
  [VarCityCode.Carces]: carcesMessages,
  [VarCityCode.FoxAmphoux]: foxAmphouxMessages
}
export const varMessages = DepartmentMessages.create<VarCityList<OrganizationMessages>>("Var", varCityMessages)
