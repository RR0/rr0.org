import { alabamaCities } from "./al/AlabamaCities"
import { californiaCities } from "./ca/CaliforniaCities"
import { texasCities } from "./tx/TexasCities"
import { floridaCities } from "./fl/FloridaCities"
import { pennsylvaniaCities } from "./pa/PennsylvaniaCities"
import { washingtonCities } from "./wa/WashingtonCities"
import { Organization } from "../../Organization"
import { indianaCities } from "./in/IndianaCities"
import { City } from "../../country/region/department/city/City"
import { Department } from "../../country/region/department/Department"
import { Place } from "../../../place/Place"

export const usaCities: Organization[] = [
  ...alabamaCities,
  ...californiaCities,
  ...floridaCities,
  ...indianaCities,
  ...pennsylvaniaCities,
  ...texasCities,
  ...washingtonCities
]

export function usaCity(code: string, county: Department, place: Place): City {
  return new City(code, county, [place])
}
