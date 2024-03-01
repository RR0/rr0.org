import { Country } from "../country/Country"
import { CountryCode } from "../country/CountryCode"
import { UsaRegionCode } from "./region/UsaRegionCode"
import { Place } from "../../place/Place"
import { Region } from "../country/region/Region"

export const usa = new Country(CountryCode.us)

export function usaRegion(code: UsaRegionCode, place: Place) {
  return new Region(code, usa, [place])
}
