import { Country } from "../country/Country"
import { CountryCode } from "../country/CountryCode"
import { Place } from "../../place/Place"
import { Region } from "../country/region/Region"
import { MexicoRegionCode } from "./region/MexicoRegionCode"

export const mexico = new Country(CountryCode.mx)

export function mexicoRegion(code: MexicoRegionCode, place: Place) {
  return new Region(code, mexico, [place])
}
