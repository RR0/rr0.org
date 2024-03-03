import { Country } from "../country/Country"
import { CountryCode } from "../country/CountryCode"
import { Place } from "../../place/Place"
import { Organization, OrganizationType } from "../Organization"
import { NewZealandRegionCode } from "./region/NewZealandRegionCode"

export const newZealand = new Country(CountryCode.nz)

export function newZealandRegion(code: NewZealandRegionCode, place: Place) {
  return new Organization(code, [place], OrganizationType.region, newZealand)
}
