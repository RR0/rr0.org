import { FederalDistrictCityCode } from "./FederalDistrictCityCode.js"
import { brasiliaMessages_en } from "./70000-000/BrasiliaMessages_en.js"
import { OrganizationMessages } from "../../../../OrganizationMessages.js"
import { OrganizationType } from "../../../../Organization.js"

export const federalDistrictMessages_en = new OrganizationMessages("Federal District")
federalDistrictMessages_en[OrganizationType.city] = {
  [FederalDistrictCityCode.Brasilia]: brasiliaMessages_en
}
