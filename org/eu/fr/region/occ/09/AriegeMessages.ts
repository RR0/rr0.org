import { AriegeCityCode } from "./AriegeCityCode.js"
import { cosMessages } from "./cos/CosMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

type AriegeCityMessages = { [key in AriegeCityCode]: OrganizationMessages }
const audeCityMessages: AriegeCityMessages = {
  [AriegeCityCode.Cos]: cosMessages
}
export const ariegeMessages = DepartmentMessages.create<AriegeCityMessages>("Ariège", audeCityMessages)
