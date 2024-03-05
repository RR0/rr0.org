import { City } from "../../country/region/department/city/City"
import { victoriaCities } from "./vic/VictoriaCities"
import { westmorelandCities } from "../../us/region/pa/westmoreland/WestmorelandCities"
import { southAustraliaCities } from "./sa/SouthAustraliaCities"

export const australiaCities: City[] = [
  ...victoriaCities,
  ...westmorelandCities,
  ...southAustraliaCities
]
