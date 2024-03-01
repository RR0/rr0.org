import { rioDeJaneiroMessages_fr } from "./riodejaneiro/RioDeJaneiroMessages_fr"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"

export const southEastMessages_fr = new OrganizationMessages("Région Sud-Est")
southEastMessages_fr[OrganizationType.department] = {
  rioDeJaneiro: rioDeJaneiroMessages_fr
}
