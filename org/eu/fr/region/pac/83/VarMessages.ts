import { VarCityCode } from "./VarCityCode"
import { foxAmphouxMessages } from "./FoxAmphoux/FoxAmphouxMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { carcesMessages } from "./Carces/CarcesMessages"
import { grimaudMessages } from "./Grimaud/GrimaudMessages"

type VarCityList<T> = { [key in VarCityCode]: T }
const varCityMessages: VarCityList<OrganizationMessages> = {
  [VarCityCode.Carces]: carcesMessages,
  [VarCityCode.FoxAmphoux]: foxAmphouxMessages,
  [VarCityCode.Grimaud]: grimaudMessages
}
export const varMessages = DepartmentMessages.create<VarCityList<OrganizationMessages>>("Var", varCityMessages)
