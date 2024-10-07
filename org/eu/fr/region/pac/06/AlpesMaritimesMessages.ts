import { cannesMessages } from "./cannes/CannesMessages.js"
import { AlpesMaritimesCityCode } from "./AlpesMaritimesCityCode.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { cagnesSurMerMessages } from "./cagnessurmer/CagnesSurMerMessages.js"

export type alpesMaritimesCityList<T> = { [key in AlpesMaritimesCityCode]: T }
export const alpesMaritimesCityMessages: alpesMaritimesCityList<OrganizationMessages> = {
  [AlpesMaritimesCityCode.Cannes]: cannesMessages,
  [AlpesMaritimesCityCode.CagnesSurMer]: cagnesSurMerMessages
}
export const alpesMaritimesMessages = DepartmentMessages.create("Alpes-Maritimes", alpesMaritimesCityMessages)
