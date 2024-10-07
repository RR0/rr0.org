import { VaucluseCityCode } from "./VaucluseCityCode.js"
import { bolleneMessages } from "./Bollene/BolleneMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

type VaucluseCityList<T> = { [key in VaucluseCityCode]: T }
const vaucluseCityMessages: VaucluseCityList<OrganizationMessages> = {
  [VaucluseCityCode.Bollene]: bolleneMessages
}
export const vaucluseMessages = DepartmentMessages.create<VaucluseCityList<OrganizationMessages>>("Vaucluse",
  vaucluseCityMessages)
