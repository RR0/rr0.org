import { indreCities } from "./36/IndreCities"
import { City } from "../../../../country/region/department/city/City"
import { loiretCities } from "./45/LoiretCities"
import { indreEtLoireCities } from "./37/IndreEtLoireCities"

export const centreValDeLoireCities: City[] = [
  ...indreCities,
  ...indreEtLoireCities,
  ...loiretCities
]
