import { Country } from "../country/Country"
import { CountryCode } from "../country/CountryCode"
import { Place } from "../../place/Place"
import { Region } from "../country/region/Region"
import { ColombiaRegionCode } from "./region/ColombiaRegionCode"

export const colombia = new Country(CountryCode.co)

export function colombiaRegion(code: ColombiaRegionCode, place: Place) {
  return new Region(code, colombia, [place])
}
