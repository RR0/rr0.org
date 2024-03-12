import { monroeCities } from "./monroe/MonroeCities"
import { City } from "../../../country/region/department/city/City"
import { elkhartCities } from "./elkhart/ElkhartCities"

export const indianaCities: City[] = [
  ...elkhartCities,
  ...monroeCities
]
