import { Country } from "../country/Country"
import { CountryCode } from "../country/CountryCode"
import { Place } from "../../place/Place"
import { Region } from "../country/region/Region"
import { GermanyRegionCode } from "./region/GermanyRegionCode"

export const germany = new Country(CountryCode.de)

export function germanyRegion(code: GermanyRegionCode, place: Place) {
  return new Region(code, germany, [place])
}
