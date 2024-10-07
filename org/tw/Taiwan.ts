import { Country } from "../country/Country.js"
import { CountryCode } from "../country/CountryCode.js"
import { Place } from "../../place/Place.js"
import { Region } from "../country/region/Region.js"
import { TaiwanRegionCode } from "./region/TaiwanRegionCode.js"

export const taiwan = new Country(CountryCode.tw)

export function taiwanRegion(code: TaiwanRegionCode, place: Place) {
  return new Region(code, taiwan, [place])
}
