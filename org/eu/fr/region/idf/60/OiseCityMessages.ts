import { OiseCityCode } from "./OiseCityCode"
import { pontLEveque60Messages } from "./pontleveque/PontLEvequeMessages"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"

export const oiseCityMessages: { [key in OiseCityCode]: OrganizationMessages } = {
  [OiseCityCode.PontLEveque]: pontLEveque60Messages
}

export const oiseMessages = new DepartmentMessages("Oise", oiseCityMessages)
