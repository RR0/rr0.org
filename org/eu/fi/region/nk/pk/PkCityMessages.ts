import { PkCityCode } from "./PkCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"

export type PkCityMessagesList = {
  [key in PkCityCode]: OrganizationMessages
}

export const pkCityMessages: PkCityMessagesList = {
  [PkCityCode.Kieksa]: new OrganizationMessages("Lieksa", "Pielisjärvi", "Pielisjärvi-Lieksa")
}
