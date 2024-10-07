import { federalDistrictMessages_en } from "./federaldistrict/FederalDistrictMessages_en.js"
import { OrganizationMessages } from "../../../OrganizationMessages.js"
import { OrganizationType } from "../../../Organization.js"

export const centralWestMessages_en = new OrganizationMessages("Central-West Region")
centralWestMessages_en[OrganizationType.department] = {
  federalDistrict: federalDistrictMessages_en
}
