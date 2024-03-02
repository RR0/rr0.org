import { cannesMessages } from "./cannes/CannesMessages"
import { AlpesMaritimesCityCode } from "./AlpesMaritimesCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"

export type alpesMaritimesCityList<T> = { [key in AlpesMaritimesCityCode]: T }

export const alpesMaritimesCityMessages: alpesMaritimesCityList<OrganizationMessages> = {
  [AlpesMaritimesCityCode.Cannes]: cannesMessages
}

export const alpesMaritimesMessages = new DepartmentMessages<alpesMaritimesCityList<OrganizationMessages>>(
  "Alpes Maritimes",
  alpesMaritimesCityMessages)
