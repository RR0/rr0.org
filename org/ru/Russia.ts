import { Country } from "../country/Country"
import { CountryCode } from "../country/CountryCode"
import { Place } from "../../place/Place"
import { Region } from "../country/region/Region"
import { RussiaRegionCode } from "./region/RussiaRegionCode"

export const russia = new Country(CountryCode.ru)

export function russiaRegion(code: RussiaRegionCode, place: Place) {
  return new Region(code, russia, [place])
}
