import { Place } from "../../../../../place/Place.js"
import { City } from "../../../../country/region/department/city/City.js"
import { sanDiego } from "./SanDiego.js"

export function sanDiegoCity(zipCode: string, place: Place) {
  return new City(zipCode, sanDiego, [place])
}
