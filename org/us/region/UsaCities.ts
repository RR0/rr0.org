import { alabamaCities } from "./al/AlabamaCities"
import { californiaCities } from "./ca/CaliforniaCities"
import { texasCities } from "./tx/TexasCities"
import { floridaCities } from "./fl/FloridaCities"
import { pennsylvaniaCities } from "./pa/PennsylvaniaCities"
import { washingtonCities } from "./wa/WashingtonCities"
import { Organization } from "../../Organization"
import { indianaCities } from "./in/IndianaCities"

export const usaCities: Organization[] = [
  ...alabamaCities,
  ...californiaCities,
  ...floridaCities,
  ...indianaCities,
  ...pennsylvaniaCities,
  ...texasCities,
  ...washingtonCities
]
