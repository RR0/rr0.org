import { VarCityCode } from "./VarCityCode.js"
import { foxAmphouxMessages } from "./FoxAmphoux/FoxAmphouxMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { carcesMessages } from "./Carces/CarcesMessages.js"
import { grimaudMessages } from "./Grimaud/GrimaudMessages.js"

type VarCityList<T> = { [key in VarCityCode]: T }
const varCityMessages: VarCityList<OrganizationMessages> = {
  [VarCityCode.Carces]: carcesMessages,
  [VarCityCode.FoxAmphoux]: foxAmphouxMessages,
  [VarCityCode.Grimaud]: grimaudMessages
}
export const varMessages = DepartmentMessages.create<VarCityList<OrganizationMessages>>("Var", varCityMessages)
