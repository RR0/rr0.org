import { VaucluseCityCode } from "./VaucluseCityCode"
import { bolleneMessages } from "./bollene/BolleneMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"

type VaucluseCityList<T> = { [key in VaucluseCityCode]: T }
const vaucluseCityMessages: VaucluseCityList<OrganizationMessages> = {
  [VaucluseCityCode.Bollene]: bolleneMessages
}
export const vaucluseMessages = new DepartmentMessages<VaucluseCityList<OrganizationMessages>>("Vaucluse",
  vaucluseCityMessages)
