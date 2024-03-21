import { indreCities } from "./36/IndreCities"
import { City } from "../../../../country/region/department/city/City"
import { loiretCities } from "./45/LoiretCities"
import { indreEtLoireCities } from "./37/IndreEtLoireCities"
import { cherCities } from "./18/CherCities"

export const centreValDeLoireCities: City[] = [
  ...cherCities,
  ...indreCities,
  ...indreEtLoireCities,
  ...loiretCities
]
