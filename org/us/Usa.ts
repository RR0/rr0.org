import { CountryCode } from "../country/CountryCode"
import { UsaRegionCode } from "./region/UsaRegionCode"
import { Place } from "../../place/Place"
import { Organization, OrganizationType } from "../Organization"

export const usa = new Organization(CountryCode.us, [], OrganizationType.country)

export function usaRegion(code: UsaRegionCode, place: Place) {
  return new Organization(code, [place], OrganizationType.region, usa)
}
