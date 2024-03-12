import { City } from "../../country/region/department/city/City"
import { Department } from "../../country/region/department/Department"
import { Place } from "../../../place/Place"
import { northCaucasusCities } from "./nc/NorthCaucasusCities"

export const russiaCities: City[] = [
  ...northCaucasusCities
]

export function ukCity(code: string, county: Department, place: Place): City {
  return new City(code, county, [place])
}
