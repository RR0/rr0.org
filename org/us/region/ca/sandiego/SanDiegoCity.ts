import { Place } from "../../../../../place/Place"
import { City } from "../../../../country/region/department/city/City"
import { sanDiego } from "./SanDiego"

export function sanDiegoCity(zipCode: string, place: Place) {
  return new City(zipCode, sanDiego, [place])
}
