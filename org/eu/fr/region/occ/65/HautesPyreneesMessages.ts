import { HautesPyreneesCityCode } from "./HautesPyreneesCityCode"
import { tarbesMessages } from "./Tarbes/TarbesMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type DepCityMessages = { [key in HautesPyreneesCityCode]: OrganizationMessages }
export const hautesPyreneesMessages = DepartmentMessages.create<DepCityMessages>("Hautes-Pyrénées", {
  [HautesPyreneesCityCode.Tarbes]: tarbesMessages
})
