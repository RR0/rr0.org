import { hautevilleLompnesMessages } from "./HautevilleLompnes/HautevilleLompnesMessages"
import { AinCityCode } from "./AinCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

const allierCityMessages: { [key in AinCityCode]: CityMessages } = {
  [AinCityCode.HautevilleLompnes]: hautevilleLompnesMessages
}
export const ainMessages = DepartmentMessages.create("Ain", allierCityMessages)
