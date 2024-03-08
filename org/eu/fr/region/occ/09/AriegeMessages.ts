import { AriegeCityCode } from "./AriegeCityCode"
import { cosMessages } from "./cos/CosMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type AriegeCityMessages = { [key in AriegeCityCode]: OrganizationMessages }
const audeCityMessages: AriegeCityMessages = {
  [AriegeCityCode.Cos]: cosMessages
}
export const ariegeMessages = DepartmentMessages.create<AriegeCityMessages>("Ariège", audeCityMessages)
