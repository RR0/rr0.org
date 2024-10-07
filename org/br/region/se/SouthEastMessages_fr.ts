import { rioDeJaneiroMessages_fr } from "./riodejaneiro/RioDeJaneiroMessages_fr.js"
import { OrganizationMessages } from "../../../OrganizationMessages.js"
import { OrganizationType } from "../../../Organization.js"

export const southEastMessages_fr = new OrganizationMessages("Région Sud-Est")
southEastMessages_fr[OrganizationType.department] = {
  rioDeJaneiro: rioDeJaneiroMessages_fr
}
