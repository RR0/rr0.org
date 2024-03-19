import { City } from "../../country/region/department/city/City"
import { telanganaCities } from "./tg/TelanganaCities"
import { maharashtraCities } from "./mh/MaharashtraCities"

export const indiaCities: City[] = [
  ...maharashtraCities,
  ...telanganaCities
]
