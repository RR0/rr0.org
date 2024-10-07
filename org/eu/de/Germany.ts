import { GermanyRegionCode } from "./region/GermanyRegionCode.js"
import { Country } from "../../country/Country.js"
import { CountryCode } from "../../country/CountryCode.js"
import { Place } from "../../../place/Place.js"
import { Region } from "../../country/region/Region.js"

export const germany = new Country(CountryCode.de)

export function germanyRegion(code: GermanyRegionCode, place: Place) {
  return new Region(code, germany, [place])
}
