import { Place } from "../../place/Place.js"
import { Organization, OrganizationType } from "../Organization.js"
import { EuropeRegionCode } from "./EuropeRegionCode.js"

export function europeanRegion(code: EuropeRegionCode, country: Organization, place: Place) {
  return new Organization(code, [place], OrganizationType.region, country)
}
