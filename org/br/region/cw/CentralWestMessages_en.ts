import { federalDistrictMessages_en } from "./federaldistrict/FederalDistrictMessages_en"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"

export const centralWestMessages_en = new OrganizationMessages("Central-West Region")
centralWestMessages_en[OrganizationType.department] = {
  federalDistrict: federalDistrictMessages_en
}
