import { sartheCities } from "./72/SartheCities"
import { City } from "../../../../country/region/department/city/City"
import { maineEtLoireCities } from "./49/MaineEtLoireCities"
import { loireAtlantiqueCities } from "./44/LoireAtlantiqueCities"

export const paysDeLoireCities: City[] = [
  ...sartheCities,
  ...loireAtlantiqueCities,
  ...maineEtLoireCities
]
