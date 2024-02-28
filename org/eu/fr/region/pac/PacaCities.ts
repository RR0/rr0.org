import { hautesAlpesCities } from "./05/HautesAlpesCities"
import { City } from "../../../../country/region/department/city/City"
import { vaucluseCities } from "./84/VaucluseCities"

export const pacaCities: { [p: string]: City } = {
  ...hautesAlpesCities,
  ...vaucluseCities
}
