import { brianconMessages } from "./briancon/BrianconMessages"
import { HautesAlpesCityCode } from "./HautesAlpesCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type HautesAlpesCityList<T> = { [key in HautesAlpesCityCode]: T }
const hautesAlpesCityMessages: HautesAlpesCityList<OrganizationMessages> = {
  [HautesAlpesCityCode.Briancon]: brianconMessages
}
export const hautesAlpesMessages = DepartmentMessages.create("Gers", hautesAlpesCityMessages)
