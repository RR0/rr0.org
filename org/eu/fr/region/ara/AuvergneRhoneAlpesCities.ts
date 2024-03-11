import { rhoneCities } from "./69/RhoneCities"
import { loireCities } from "./42/LoireCities"
import { puyDeDomeCities } from "./63/PuyDeDomeCities"
import { allierCities } from "./03/AllierCities"
import { isereCities } from "./38/IsereCities"
import { Organization } from "../../../../Organization"
import { dromeCities } from "./26/DromeCities"
import { ardecheCities } from "./07/ArdecheCities"
import { cantalCities } from "./15/CantalCities"

export const auvergneRhoneAlpesCities: Organization[] = [
  ...ardecheCities,
  ...allierCities,
  ...cantalCities,
  ...dromeCities,
  ...isereCities,
  ...loireCities,
  ...puyDeDomeCities,
  ...rhoneCities
]
