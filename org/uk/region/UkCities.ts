import { City } from "../../country/region/department/city/City"
import { Department } from "../../country/region/department/Department"
import { Place } from "../../../place/Place"
import { englandCities } from "./eng/EnglandCities"

export const ukCities: City[] = [
  ...englandCities
]

export function ukCity(code: string, county: Department, place: Place): City {
  return new City(code, county, [place])
}
