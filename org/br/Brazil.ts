import { CountryCode } from "../country/CountryCode.js"
import { Place } from "../../place/Place.js"
import { BrazilRegionCode } from "./region/BrazilRegionCode.js"
import { Organization, OrganizationType } from "../Organization.js"

export const brazil = new Organization(CountryCode.br, [], OrganizationType.country)

export function brazilRegion(code: BrazilRegionCode, place: Place) {
  return new Organization(code, [place], OrganizationType.region, brazil)
}
