import { centralWestCities } from "./cw/CentralWestCities.js"
import { southEastCities } from "./se/SouthEastCities.js"
import { City } from "../../country/region/department/city/City.js"

export const brazilCities: City[] = [
  ...centralWestCities,
  ...southEastCities
]
