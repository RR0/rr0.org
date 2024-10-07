import { AudeCityCode } from "./AudeCityCode.js"
import { cucugnanMessages } from "./cucugnan/CucugnanMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

type AudeCityMessages = { [key in AudeCityCode]: OrganizationMessages }
const audeCityMessages: AudeCityMessages = {
  [AudeCityCode.Cucugnan]: cucugnanMessages
}
export const audeMessages = DepartmentMessages.create<AudeCityMessages>("Aude", audeCityMessages)
