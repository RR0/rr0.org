import { CountryCode } from "../country/CountryCode"
import { Place } from "../../place/Place"
import { BrazilRegionCode } from "./region/BrazilRegionCode"
import { Organization, OrganizationType } from "../Organization"

export const brazil = new Organization(CountryCode.br, [], OrganizationType.country)

export function brazilRegion(code: BrazilRegionCode, place: Place) {
  return new Organization(code, [place], OrganizationType.region, brazil)
}
