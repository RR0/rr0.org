import { hautevilleLompnesMessages } from "./HautevilleLompnes/HautevilleLompnesMessages.js"
import { AinCityCode } from "./AinCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

const allierCityMessages: { [key in AinCityCode]: CityMessages } = {
  [AinCityCode.HautevilleLompnes]: hautevilleLompnesMessages
}
export const ainMessages = DepartmentMessages.create("Ain", allierCityMessages)
