import { FederalDistrictCityCode } from "./FederalDistrictCityCode.js"
import { brasiliaMessages_fr } from "./70000-000/BrasiliaMessages_fr.js"
import { OrganizationMessages } from "../../../../OrganizationMessages.js"
import { OrganizationType } from "../../../../Organization.js"

export const federalDistrictMessages_fr = new OrganizationMessages("District fédéral")
federalDistrictMessages_fr[OrganizationType.city] = {
  [FederalDistrictCityCode.Brasilia]: brasiliaMessages_fr
}
