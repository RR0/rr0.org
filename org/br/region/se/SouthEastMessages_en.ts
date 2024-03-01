import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"
import { rioDeJaneiroMessages_en } from "./riodejaneiro/RioDeJaneiroMessages_en"

export const southEastMessages_en = new OrganizationMessages("South-East Region")
southEastMessages_en[OrganizationType.department] = {
  rioDeJaneiro: rioDeJaneiroMessages_en
}
