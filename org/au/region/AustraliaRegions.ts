import { westernAustralia } from "./wa/WesternAustralia.js"
import { City } from "../../country/region/department/city/City.js"
import { southAustralia } from "./sa/SouthAustralia.js"
import { victoria } from "./vic/Victoria.js"
import { newSouthWales } from "./nsw/NewSouthWales.js"

export const australiaRegions: City[] = [
  newSouthWales,
  southAustralia,
  victoria,
  westernAustralia
]
