import { Country } from "../country/Country"
import { CountryCode } from "../country/CountryCode"
import { Place } from "../../place/Place"
import { NewZealandRegionCode } from "./region/NewZealandRegionCode"
import { Region } from "../country/region/Region"

export const newZealand = new Country(CountryCode.nz)

export function newZealandRegion(code: NewZealandRegionCode, place: Place) {
  return new Region(code, newZealand, [place])
}
