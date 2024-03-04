import { CountryCode } from "../country/CountryCode"
import { UsaRegionCode } from "./region/UsaRegionCode"
import { Place } from "../../place/Place"
import { Organization, OrganizationType } from "../Organization"
import { Country } from "../country/Country"

export const usa = new Country(CountryCode.us, [])

export function usaRegion(code: UsaRegionCode, place: Place) {
  return new Organization(code, [place], OrganizationType.region, usa)
}
