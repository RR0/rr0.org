import { City } from "../../../country/region/department/city/City.js"
import { fayetteCities } from "./fayette/FayetteCities.js"
import { masonCities } from "./mason/MasonCities.js"

export const westVirginiaCities: City[] = [
  ...fayetteCities,
  ...masonCities
]
