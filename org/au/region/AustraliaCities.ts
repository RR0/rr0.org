import { City } from "../../country/region/department/city/City.js"
import { victoriaCities } from "./vic/VictoriaCities.js"
import { westmorelandCities } from "../../us/region/pa/westmoreland/WestmorelandCities.js"
import { southAustraliaCities } from "./sa/SouthAustraliaCities.js"
import { newSouthWalesCities } from "./nsw/NewSouthWalesCities.js"

export const australiaCities: City[] = [
  ...newSouthWalesCities,
  ...southAustraliaCities,
  ...victoriaCities,
  ...westmorelandCities
]
