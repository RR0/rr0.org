import { HauteVienneCityCode } from "./HauteVienneCityCode"
import { jabreillesMessages } from "./jabreilles/JabreillesMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"

const hauteVienneCityMessages: { [key in HauteVienneCityCode]: OrganizationMessages } = {
  [HauteVienneCityCode.Jabreilles]: jabreillesMessages
}
export const hauteVienneMessages = DepartmentMessages.create("Haute Vienne", hauteVienneCityMessages)
