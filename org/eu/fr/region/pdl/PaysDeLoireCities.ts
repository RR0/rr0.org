import { sartheCities } from "./72/SartheCities.js"
import { City } from "../../../../country/region/department/city/City.js"
import { maineEtLoireCities } from "./49/MaineEtLoireCities.js"
import { loireAtlantiqueCities } from "./44/LoireAtlantiqueCities.js"
import { mayenneCities } from "./53/MayenneCities.js"

export const paysDeLoireCities: City[] = [
  ...sartheCities,
  ...loireAtlantiqueCities,
  ...maineEtLoireCities,
  ...mayenneCities
]
