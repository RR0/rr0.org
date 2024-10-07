import { indreCities } from "./36/IndreCities.js"
import { City } from "../../../../country/region/department/city/City.js"
import { loiretCities } from "./45/LoiretCities.js"
import { indreEtLoireCities } from "./37/IndreEtLoireCities.js"
import { cherCities } from "./18/CherCities.js"

export const centreValDeLoireCities: City[] = [
  ...cherCities,
  ...indreCities,
  ...indreEtLoireCities,
  ...loiretCities
]
