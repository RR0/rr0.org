import { mauriacMessages } from "./mauriac/MauriacMessages.js"
import { CantalCityCode } from "./CantalCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { pierrefortMessages } from "./pierrefort/PierrefortMessages.js"

const cantalCityMessages: { [key in CantalCityCode]: CityMessages } = {
  [CantalCityCode.Mauriac]: mauriacMessages,
  [CantalCityCode.Pierrefort]: pierrefortMessages
}
export const cantalMessages = DepartmentMessages.create("Cantal", cantalCityMessages)
