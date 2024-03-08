import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { SaoneEtLoireCityCode } from "./SaoneEtLoireCityCode"
import { verosvresMessages } from "./verosvres/VerosvresMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export type SaoneEtLoireCityMessagesList = { [key in SaoneEtLoireCityCode]: CityMessages }
export const saoneEtLoireCityMessages: SaoneEtLoireCityMessagesList = {
  [SaoneEtLoireCityCode.Verosvres]: verosvresMessages
}
export const saoneEtLoireMessages = DepartmentMessages.create("Saône-et-Loire", saoneEtLoireCityMessages)
