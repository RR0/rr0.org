import { SaoneEtLoireCityCode } from "./SaoneEtLoireCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"

export type SaoneEtLoireCityMessagesList = {
  [key in SaoneEtLoireCityCode]: OrganizationMessages
}
