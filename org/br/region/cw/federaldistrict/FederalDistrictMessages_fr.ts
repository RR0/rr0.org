import { FederalDistrictCityCode } from "./FederalDistrictCityCode"
import { brasiliaMessages_fr } from "./70000-000/BrasiliaMessages_fr"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"

export const federalDistrictMessages_fr = new OrganizationMessages("District fédéral")
federalDistrictMessages_fr[OrganizationType.city] = {
  [FederalDistrictCityCode.Brasilia]: brasiliaMessages_fr
}
