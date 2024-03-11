import { Country } from "../country/Country"
import { CountryCode } from "../country/CountryCode"
import { Place } from "../../place/Place"
import { Region } from "../country/region/Region"
import { UkRegionCode } from "./region/UkRegionCode"

export const uk = new Country(CountryCode.uk)

export function ukRegion(code: UkRegionCode, place: Place) {
  return new Region(code, uk, [place])
}
