import { Place } from "../../place/Place"
import { Organization, OrganizationType } from "../Organization"
import { EuropeRegionCode } from "./EuropeRegionCode"

export function europeanRegion(code: EuropeRegionCode, country: Organization, place: Place) {
  return new Organization(code, [place], OrganizationType.region, country)
}
