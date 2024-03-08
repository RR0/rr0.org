import { rhoneCities } from "./69/RhoneCities"
import { loireCities } from "./42/LoireCities"
import { puyDeDomeCities } from "./63/PuyDeDomeCities"
import { allierCities } from "./03/AllierCities"
import { isereCities } from "./38/IsereCities"
import { Organization } from "../../../../Organization"
import { dromeCities } from "./26/DromeCities"

export const auvergneRhoneAlpesCities: Organization[] = [
  ...allierCities,
  ...dromeCities,
  ...isereCities,
  ...loireCities,
  ...puyDeDomeCities,
  ...rhoneCities
]
