import { Place } from "../../../../../../place/Place.js"
import { City } from "../../../../../country/region/department/city/City.js"
import { nwp } from "./Nwp.js"

export function createCity(zipCode: string, place: Place): City {
  return new City(zipCode, nwp, [place])
}
