import { hautesAlpesCities } from "./05/HautesAlpesCities"
import { City } from "../../../../country/region/department/city/City"
import { vaucluseCities } from "./84/VaucluseCities"
import { alpesMaritimesCities } from "./06/AlpesMaritimesCities"

export const pacaCities: { [p: string]: City } = {
  ...alpesMaritimesCities,
  ...hautesAlpesCities,
  ...vaucluseCities
}
