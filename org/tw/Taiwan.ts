import { Country } from "../country/Country"
import { CountryCode } from "../country/CountryCode"
import { Place } from "../../place/Place"
import { Region } from "../country/region/Region"
import { TaiwanRegionCode } from "./region/TaiwanRegionCode"

export const taiwan = new Country(CountryCode.tw)

export function taiwanRegion(code: TaiwanRegionCode, place: Place) {
  return new Region(code, taiwan, [place])
}
