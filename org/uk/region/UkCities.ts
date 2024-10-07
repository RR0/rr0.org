import { City } from "../../country/region/department/city/City.js"
import { Department } from "../../country/region/department/Department.js"
import { Place } from "../../../place/Place.js"
import { englandCities } from "./eng/EnglandCities.js"

export const ukCities: City[] = [
  ...englandCities
]

export function ukCity(code: string, county: Department, place: Place): City {
  return new City(code, county, [place])
}
