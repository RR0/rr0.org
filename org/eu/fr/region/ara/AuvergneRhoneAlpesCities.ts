import { rhoneCities } from "./69/RhoneCities"
import { City } from "../../../../country/region/department/city/City"
import { loireCities } from "./42/LoireCities"
import { puyDeDomeCities } from "./63/PuyDeDomeCities"

export const auvergneRhoneAlpesCities: City[] = [
  ...rhoneCities,
  ...loireCities,
  ...puyDeDomeCities
]
