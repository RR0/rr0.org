import { Department } from "../../country/region/department/Department"
import { Place } from "../../../place/Place"
import { City } from "../../country/region/department/city/City"

export function usaCity(code: string, county: Department, place: Place): City {
  return new City(code, county, [place])
}
