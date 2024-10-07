import { City } from "../../country/region/department/city/City.js"
import { Department } from "../../country/region/department/Department.js"
import { Place } from "../../../place/Place.js"
import { northCaucasusCities } from "./nc/NorthCaucasusCities.js"

export const russiaCities: City[] = [
  ...northCaucasusCities
]

export function ukCity(code: string, county: Department, place: Place): City {
  return new City(code, county, [place])
}
