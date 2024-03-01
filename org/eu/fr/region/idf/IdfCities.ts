import { hautsDeSeineCities } from "./92/HautsDeSeineCities"
import { City } from "../../../../country/region/department/city/City"
import { oiseCities } from "./60/OiseCities"
import { parisCities } from "./75/ParisCities"
import { yvelinesCities } from "./78/YvelinesCities"

export const idfCities: City[] = [
  ...hautsDeSeineCities,
  ...oiseCities,
  ...parisCities,
  ...yvelinesCities
]
