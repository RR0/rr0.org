import { City } from "../../country/region/department/city/City.js"
import { telanganaCities } from "./tg/TelanganaCities.js"
import { maharashtraCities } from "./mh/MaharashtraCities.js"

export const indiaCities: City[] = [
  ...maharashtraCities,
  ...telanganaCities
]
