import { VaucluseCityCode } from "./VaucluseCityCode"
import { bolleneMessages } from "./Bollene/BolleneMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type VaucluseCityList<T> = { [key in VaucluseCityCode]: T }
const vaucluseCityMessages: VaucluseCityList<OrganizationMessages> = {
  [VaucluseCityCode.Bollene]: bolleneMessages
}
export const vaucluseMessages = DepartmentMessages.create<VaucluseCityList<OrganizationMessages>>("Vaucluse",
  vaucluseCityMessages)
