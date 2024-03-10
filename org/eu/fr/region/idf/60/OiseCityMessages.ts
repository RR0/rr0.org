import { OiseCityCode } from "./OiseCityCode"
import { pontLEveque60Messages } from "./pontleveque/PontLEvequeMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { compiegneMessages } from "./compiegne/CompiegneMessages"
import { neuillyEnThelleMessages } from "./neuillyenthelle/NeuillyEnThelleMessages"

export const oiseCityMessages: { [key in OiseCityCode]: CityMessages } = {
  [OiseCityCode.PontLEveque]: pontLEveque60Messages,
  [OiseCityCode.Compiegne]: compiegneMessages,
  [OiseCityCode.NeuillyEnThelle]: neuillyEnThelleMessages
}
export const oiseMessages = DepartmentMessages.create("Oise", oiseCityMessages)
