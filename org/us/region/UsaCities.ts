import { alabamaCities } from "./al/AlabamaCities"
import { californiaCities } from "./ca/CaliforniaCities"
import { texasCities } from "./tx/TexasCities"
import { floridaCities } from "./fl/FloridaCities"
import { pennsylvaniaCities } from "./pa/PennsylvaniaCities"
import { washingtonCities } from "./wa/WashingtonCities"

export const usaCities = {
  ...alabamaCities,
  ...californiaCities,
  ...floridaCities,
  ...pennsylvaniaCities,
  ...texasCities,
  ...washingtonCities
}
