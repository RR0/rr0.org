import { Region, RegionCode_eu } from "../country/region/Region"
import { Country } from "../country/Country"
import { Place } from "../../place/Place"

export function createRegion_eu(code: RegionCode_eu, country: Country, place: Place) {
  return new Region(code, country, [place], `eu/${country.code}/region/${code}`)
}
