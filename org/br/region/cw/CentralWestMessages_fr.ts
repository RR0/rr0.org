import { federalDistrictMessages_fr } from "./federaldistrict/FederalDistrictMessages_fr"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"

export const centralWestMessages_fr = new OrganizationMessages("Région Centre-Ouest")
centralWestMessages_fr[OrganizationType.department] = {
  federalDistrict: federalDistrictMessages_fr
}
