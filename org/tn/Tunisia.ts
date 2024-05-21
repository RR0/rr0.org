import { Country } from "../country/Country"
import { CountryCode } from "../country/CountryCode"
import { Place } from "../../place/Place"
import { Region } from "../country/region/Region"
import { TunisiaRegionCode } from "./region/TunisiaRegionCode"

export const tunisia = new Country(CountryCode.tn)

export function tunisiaRegion(code: TunisiaRegionCode, place: Place) {
  return new Region(code, tunisia, [place])
}
