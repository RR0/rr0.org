import { brianconMessages } from "./briancon/BrianconMessages"
import { HautesAlpesCityCode } from "./HautesAlpesCityCode"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export type HautesAlpesCityList<T> = { [key in HautesAlpesCityCode]: T }

export const hautesAlpesCityMessages: HautesAlpesCityList<CityMessages> = {
  [HautesAlpesCityCode.Briancon]: brianconMessages
}

export const hautesAlpesMessages = new DepartmentMessages<HautesAlpesCityList<CityMessages>>("Gers",
  hautesAlpesCityMessages)
