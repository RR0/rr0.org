import { Country } from "../country/Country"
import { CountryCode } from "../country/CountryCode"
import { Place } from "../../place/Place"
import { Region } from "../country/region/Region"
import { SeychellesRegionCode } from "./region/SeychellesRegionCode"

export const seychelles = new Country(CountryCode.sc)

export function seychellesRegion(code: SeychellesRegionCode, place: Place) {
  return new Region(code, seychelles, [place])
}
