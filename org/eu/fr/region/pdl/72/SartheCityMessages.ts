import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { SartheCityCode } from "./SartheCityCode"
import { leMansMessages } from "./lemans/LeMansMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export type SartheCityMessagesList = {
  [key in SartheCityCode]: CityMessages
}

export const sartheCityMessages: SartheCityMessagesList = {
  [SartheCityCode.LeMans]: leMansMessages
}

export const sartheMessages = new DepartmentMessages<SartheCityMessagesList>("Sarthe", sartheCityMessages)
