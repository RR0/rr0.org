import { Country } from "../country/Country"
import { CountryCode } from "../country/CountryCode"
import { Place } from "../../place/Place"
import { Region } from "../country/region/Region"
import { DominicanRepublicRegionCode } from "./region/DominicanRepublicRegionCode"

export const dominicanRepublic = new Country(CountryCode.do)

export function dominicanRepublicRegion(code: DominicanRepublicRegionCode, place: Place) {
  return new Region(code, dominicanRepublic, [place])
}
