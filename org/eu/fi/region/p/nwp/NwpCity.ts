import { Place } from "../../../../../../place/Place"
import { City } from "../../../../../country/region/department/city/City"
import { nwp } from "./Nwp"

export function createCity(zipCode: string, place: Place): City {
  return new City(zipCode, nwp, [place])
}
