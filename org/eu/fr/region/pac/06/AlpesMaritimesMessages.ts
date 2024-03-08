import { cannesMessages } from "./cannes/CannesMessages"
import { AlpesMaritimesCityCode } from "./AlpesMaritimesCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { cagnesSurMerMessages } from "./cagnessurmer/CagnesSurMerMessages"

export type alpesMaritimesCityList<T> = { [key in AlpesMaritimesCityCode]: T }
export const alpesMaritimesCityMessages: alpesMaritimesCityList<OrganizationMessages> = {
  [AlpesMaritimesCityCode.Cannes]: cannesMessages,
  [AlpesMaritimesCityCode.CagnesSurMer]: cagnesSurMerMessages
}
export const alpesMaritimesMessages = DepartmentMessages.create("Alpes-Maritimes", alpesMaritimesCityMessages)
