import { Place } from "../../../../../../place/Place"
import { FederalDistrictCityCode } from "../FederalDistrictCityCode"
import { Organization, OrganizationType } from "../../../../../Organization"
import { federalDistrict } from "../FederalDistrict"

export let brasilia = new Organization(
  FederalDistrictCityCode.Brasilia,
  [Place.fromDMS("15°47′38″S,47°52′58″W")],
  OrganizationType.city,
  federalDistrict
)
