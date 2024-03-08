import { sartheCities } from "./72/SartheCities"
import { City } from "../../../../country/region/department/city/City"
import { maineEtLoireCities } from "./49/MaineEtLoireCities"

export const paysDeLoireCities: City[] = [
  ...sartheCities,
  ...maineEtLoireCities
]
