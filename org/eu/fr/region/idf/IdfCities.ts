import { hautsDeSeineCities } from "./92/HautsDeSeineCities"
import { City } from "../../../../country/region/department/city/City"
import { oiseCities } from "./60/OiseCities"

export const idfCities: City[] = [
  ...hautsDeSeineCities,
  ...oiseCities
]
