import { City } from "../../country/region/department/city/City"
import { victoriaCities } from "./vic/VictoriaCities"
import { westmorelandCities } from "../../us/region/pa/westmoreland/WestmorelandCities"
import { southAustraliaCities } from "./sa/SouthAustraliaCities"
import { newSouthWalesCities } from "./nsw/NewSouthWalesCities"

export const australiaCities: City[] = [
  ...newSouthWalesCities,
  ...southAustraliaCities,
  ...victoriaCities,
  ...westmorelandCities
]
