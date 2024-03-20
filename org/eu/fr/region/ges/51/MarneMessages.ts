import { MarneCityCode } from "./MarneCityCode"
import { reimsMessages } from "./Reims/ReimsMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { OrganizationType } from "../../../../../Organization"

export const marneMessages = new OrganizationMessages("Marne")
marneMessages[OrganizationType.city] = {
  [MarneCityCode.Reims]: reimsMessages
}
