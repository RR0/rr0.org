import { centralWestCities } from "./cw/CentralWestCities"
import { southEastCities } from "./se/SouthEastCities"
import { City } from "../../country/region/department/city/City"

export const brazilCities: City[] = [
  ...centralWestCities,
  ...southEastCities
]
