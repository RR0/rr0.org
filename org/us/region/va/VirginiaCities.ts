import { City } from "../../../country/region/department/city/City"
import { bristol } from "./bristol/Bristol"
import { arlingtonCities } from "./arlington/ArlingtonCities"

export const virginiaCities: City[] = [
  bristol,
  ...arlingtonCities
]
