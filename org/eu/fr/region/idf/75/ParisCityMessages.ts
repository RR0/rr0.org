import { ParisCityCode } from "./ParisCityCode"
import { paris75Messages } from "./pontleveque/ParisMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export const parisCityMessages: { [key in ParisCityCode]: CityMessages } = {
  [ParisCityCode.Paris]: paris75Messages
}

export const parisMessages = new DepartmentMessages("Paris", parisCityMessages)
