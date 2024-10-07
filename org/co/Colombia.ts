import { Country } from "../country/Country.js"
import { CountryCode } from "../country/CountryCode.js"
import { Place } from "../../place/Place.js"
import { Region } from "../country/region/Region.js"
import { ColombiaRegionCode } from "./region/ColombiaRegionCode.js"

export const colombia = new Country(CountryCode.co)

export function colombiaRegion(code: ColombiaRegionCode, place: Place) {
  return new Region(code, colombia, [place])
}
