import { mauriacMessages } from "./mauriac/MauriacMessages"
import { CantalCityCode } from "./CantalCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { pierrefortMessages } from "./pierrefort/PierrefortMessages"

const cantalCityMessages: { [key in CantalCityCode]: CityMessages } = {
  [CantalCityCode.Mauriac]: mauriacMessages,
  [CantalCityCode.Pierrefort]: pierrefortMessages
}
export const cantalMessages = DepartmentMessages.create("Cantal", cantalCityMessages)
