import { OiseCityCode } from "./OiseCityCode"
import { pontLEveque60Messages } from "./pontleveque/PontLEvequeMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export const oiseCityMessages: { [key in OiseCityCode]: CityMessages } = {
  [OiseCityCode.PontLEveque]: pontLEveque60Messages
}

export const oiseMessages = new DepartmentMessages("Oise", oiseCityMessages)
