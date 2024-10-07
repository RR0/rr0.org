import { HautesPyreneesCityCode } from "./HautesPyreneesCityCode.js"
import { tarbesMessages } from "./Tarbes/TarbesMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

type DepCityMessages = { [key in HautesPyreneesCityCode]: OrganizationMessages }
export const hautesPyreneesMessages = DepartmentMessages.create<DepCityMessages>("Hautes-Pyrénées", {
  [HautesPyreneesCityCode.Tarbes]: tarbesMessages
})
