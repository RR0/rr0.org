import { OrganizationMessages } from "../../../OrganizationMessages.js"
import { OrganizationType } from "../../../Organization.js"
import { rioDeJaneiroMessages_en } from "./riodejaneiro/RioDeJaneiroMessages_en.js"

export const southEastMessages_en = new OrganizationMessages("South-East Region")
southEastMessages_en[OrganizationType.department] = {
  rioDeJaneiro: rioDeJaneiroMessages_en
}
