import { ParisCityCode } from "./ParisCityCode.js"
import { paris75Messages } from "./paris/ParisMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

const parisCityMessages: { [key in ParisCityCode]: CityMessages } = {
  [ParisCityCode.Paris]: paris75Messages
}
export const parisMessages = DepartmentMessages.create("Paris", parisCityMessages)
