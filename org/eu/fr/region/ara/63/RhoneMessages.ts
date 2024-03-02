import { riomMessages } from "./riom/RiomMessages"
import { PuyDeDomeCityCode } from "./PuyDeDomeCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { OrganizationType } from "../../../../../Organization"

export const puyDeDomeMessages = new OrganizationMessages("Rhône")
puyDeDomeMessages[OrganizationType.city] = {
  [PuyDeDomeCityCode.Riom]: riomMessages
}
