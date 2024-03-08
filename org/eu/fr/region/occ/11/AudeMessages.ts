import { AudeCityCode } from "./AudeCityCode"
import { cucugnanMessages } from "./cucugnan/CucugnanMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type AudeCityMessages = { [key in AudeCityCode]: OrganizationMessages }
const audeCityMessages: AudeCityMessages = {
  [AudeCityCode.Cucugnan]: cucugnanMessages
}
export const audeMessages = DepartmentMessages.create<AudeCityMessages>("Aude", audeCityMessages)
