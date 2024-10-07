import { CountryCode } from "../country/CountryCode.js"
import { UsaStates } from "./region/UsaStates.js"
import { Place } from "../../place/Place.js"
import { Country } from "../country/Country.js"
import { Region } from "../country/region/Region.js"

export const usa = new Country(CountryCode.us, [])

export function usaRegion(code: UsaStates, place: Place) {
  return new Region(code, usa, [place])
}
