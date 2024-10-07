import { brianconMessages } from "./briancon/BrianconMessages.js"
import { HautesAlpesCityCode } from "./HautesAlpesCityCode.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

type HautesAlpesCityList<T> = { [key in HautesAlpesCityCode]: T }
const hautesAlpesCityMessages: HautesAlpesCityList<OrganizationMessages> = {
  [HautesAlpesCityCode.Briancon]: brianconMessages
}
export const hautesAlpesMessages = DepartmentMessages.create("Gers", hautesAlpesCityMessages)
