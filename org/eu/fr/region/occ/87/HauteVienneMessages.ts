import { HauteVienneCityCode } from "./HauteVienneCityCode.js"
import { jabreillesMessages } from "./jabreilles/JabreillesMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"

const hauteVienneCityMessages: { [key in HauteVienneCityCode]: OrganizationMessages } = {
  [HauteVienneCityCode.Jabreilles]: jabreillesMessages
}
export const hauteVienneMessages = DepartmentMessages.create("Haute Vienne", hauteVienneCityMessages)
