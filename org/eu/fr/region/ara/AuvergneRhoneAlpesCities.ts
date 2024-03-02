import { rhoneCities } from "./69/RhoneCities"
import { loireCities } from "./42/LoireCities"
import { puyDeDomeCities } from "./63/PuyDeDomeCities"
import { allierCities } from "./03/AllierCities"
import { isereCities } from "./38/IsereCities"
import { Organization } from "../../../../Organization"

export const auvergneRhoneAlpesCities: Organization[] = [
  ...allierCities,
  ...isereCities,
  ...loireCities,
  ...puyDeDomeCities,
  ...rhoneCities
]
