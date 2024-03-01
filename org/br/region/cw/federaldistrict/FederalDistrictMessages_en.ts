import { FederalDistrictCityCode } from "./FederalDistrictCityCode"
import { brasiliaMessages_en } from "./70000-000/BrasiliaMessages_en"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"

export const federalDistrictMessages_en = new OrganizationMessages("Federal District")
federalDistrictMessages_en[OrganizationType.city] = {
  [FederalDistrictCityCode.Brasilia]: brasiliaMessages_en
}
