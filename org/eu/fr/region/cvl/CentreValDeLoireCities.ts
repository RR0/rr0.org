import { indreCities } from "./36/IndreCities"
import { City } from "../../../../country/region/department/city/City"
import { loiretCities } from "./45/LoiretCities"

export const centreValDeLoireCities: City[] = [
  ...indreCities,
  ...loiretCities
]
