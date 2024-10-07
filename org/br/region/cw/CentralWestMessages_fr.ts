import { federalDistrictMessages_fr } from "./federaldistrict/FederalDistrictMessages_fr.js"
import { OrganizationMessages } from "../../../OrganizationMessages.js"
import { OrganizationType } from "../../../Organization.js"

export const centralWestMessages_fr = new OrganizationMessages("Région Centre-Ouest")
centralWestMessages_fr[OrganizationType.department] = {
  federalDistrict: federalDistrictMessages_fr
}
