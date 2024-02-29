import { alabamaCities } from "./al/AlabamaCities"
import { californiaCities } from "./ca/CaliforniaCities"
import { texasCities } from "./tx/TexasCities"
import { floridaCities } from "./fl/FloridaCities"
import { pennsylvaniaCities } from "./pa/PennsylvaniaCities"
import { washingtonCities } from "./wa/WashingtonCities"
import { City } from "../../country/region/department/city/City"

export const usaCities: City[] = [
  ...alabamaCities,
  ...californiaCities,
  ...floridaCities,
  ...pennsylvaniaCities,
  ...texasCities,
  ...washingtonCities
]
