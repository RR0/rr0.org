import { City } from "../../../country/region/department/city/City"
import { fayetteCities } from "./fayette/FayetteCities"
import { masonCities } from "./mason/MasonCities"

export const westVirginiaCities: City[] = [
  ...fayetteCities,
  ...masonCities
]
