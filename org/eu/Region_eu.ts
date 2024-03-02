import { RegionCode_eu } from "../country/region/Region"
import { Place } from "../../place/Place"
import { Organization, OrganizationType } from "../Organization"

export function createRegion_eu(code: RegionCode_eu, country: Organization, place: Place) {
  return new Organization(code, [place], OrganizationType.region, country)
}
