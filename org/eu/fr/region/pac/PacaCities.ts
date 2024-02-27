import { hautesAlpesCities } from "./05/HautesAlpesCities"
import { City } from "../../../../country/region/department/city/City"

export const pacaCities: { [p: string]: City } = {
  ...hautesAlpesCities
}
