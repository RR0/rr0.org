import { brianconMessages } from "./briancon/BrianconMessages"
import { HautesAlpesCityCode } from "./HautesAlpesCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export type HautesAlpesCityList<T> = { [key in HautesAlpesCityCode]: T }

export const hautesAlpesCityMessages: HautesAlpesCityList<OrganizationMessages> = {
  [HautesAlpesCityCode.Briancon]: brianconMessages
}

export const hautesAlpesMessages = new DepartmentMessages<HautesAlpesCityList<OrganizationMessages>>("Gers",
  hautesAlpesCityMessages)
