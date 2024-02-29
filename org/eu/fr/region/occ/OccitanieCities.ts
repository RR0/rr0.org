import { gersCities } from "./32/GersCities"
import { City } from "../../../../country/region/department/city/City"
import { heraultCities } from "./34/HeraultCities"

export const occitanieCities: City[] = [
  ...gersCities,
  ...heraultCities
]
