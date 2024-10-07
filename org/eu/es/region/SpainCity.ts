import { Department } from "../../../country/region/department/Department.js"
import { City } from "../../../country/region/department/city/City.js"
import { Place } from "../../../../place/Place.js"

export function spainCity(code: string, province: Department, place: Place): City {
  return new City(code, province, [place])
}
