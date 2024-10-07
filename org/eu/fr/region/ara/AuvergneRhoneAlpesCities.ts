import { rhoneCities } from "./69/RhoneCities.js"
import { loireCities } from "./42/LoireCities.js"
import { puyDeDomeCities } from "./63/PuyDeDomeCities.js"
import { allierCities } from "./03/AllierCities.js"
import { isereCities } from "./38/IsereCities.js"
import { Organization } from "../../../../Organization.js"
import { dromeCities } from "./26/DromeCities.js"
import { ardecheCities } from "./07/ArdecheCities.js"
import { cantalCities } from "./15/CantalCities.js"
import { ainCities } from "./01/AinCities.js"
import { savoieCities } from "./73/SavoieCities.js"

export const auvergneRhoneAlpesCities: Organization[] = [
  ...ainCities,
  ...ardecheCities,
  ...allierCities,
  ...cantalCities,
  ...dromeCities,
  ...isereCities,
  ...loireCities,
  ...puyDeDomeCities,
  ...rhoneCities,
  ...savoieCities
]
