import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { SaoneEtLoireCityCode } from "./SaoneEtLoireCityCode"
import { verosvresMessages } from "./verosvres/VerosvresMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"

export type SaoneEtLoireCityMessagesList = {
  [key in SaoneEtLoireCityCode]: OrganizationMessages
}
export const saoneEtLoireCityMessages: SaoneEtLoireCityMessagesList = {
  [SaoneEtLoireCityCode.Verosvres]: verosvresMessages
}
export const saoneEtLoireMessages = DepartmentMessages.create("Saône-et-Loire", saoneEtLoireCityMessages)
