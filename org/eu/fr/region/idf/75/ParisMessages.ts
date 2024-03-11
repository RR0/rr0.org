import { ParisCityCode } from "./ParisCityCode"
import { paris75Messages } from "./paris/ParisMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

const parisCityMessages: { [key in ParisCityCode]: CityMessages } = {
  [ParisCityCode.Paris]: paris75Messages
}
export const parisMessages = DepartmentMessages.create("Paris", parisCityMessages)
