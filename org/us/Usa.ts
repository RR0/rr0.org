import { CountryCode } from "../country/CountryCode"
import { UsaStates } from "./region/UsaStates"
import { Place } from "../../place/Place"
import { Country } from "../country/Country"
import { Region } from "../country/region/Region"

export const usa = new Country(CountryCode.us, [])

export function usaRegion(code: UsaStates, place: Place) {
  return new Region(code, usa, [place])
}
