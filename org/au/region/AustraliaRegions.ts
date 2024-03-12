import { westernAustralia } from "./wa/WesternAustralia"
import { City } from "../../country/region/department/city/City"
import { southAustralia } from "./sa/SouthAustralia"
import { victoria } from "./vic/Victoria"
import { newSouthWales } from "./nsw/NewSouthWales"

export const australiaRegions: City[] = [
  newSouthWales,
  southAustralia,
  victoria,
  westernAustralia
]
