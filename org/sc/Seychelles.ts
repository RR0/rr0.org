import { Country } from "../country/Country.js"
import { CountryCode } from "../country/CountryCode.js"
import { Place } from "../../place/Place.js"
import { Region } from "../country/region/Region.js"
import { SeychellesRegionCode } from "./region/SeychellesRegionCode.js"

export const seychelles = new Country(CountryCode.sc)

export function seychellesRegion(code: SeychellesRegionCode, place: Place) {
  return new Region(code, seychelles, [place])
}
