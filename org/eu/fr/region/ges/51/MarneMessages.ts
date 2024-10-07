import { MarneCityCode } from "./MarneCityCode.js"
import { reimsMessages } from "./Reims/ReimsMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { OrganizationType } from "../../../../../Organization.js"

export const marneMessages = new OrganizationMessages("Marne")
marneMessages[OrganizationType.city] = {
  [MarneCityCode.Reims]: reimsMessages
}
