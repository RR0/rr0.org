import { rhoneCities } from "./69/RhoneCities"
import { City } from "../../../../country/region/department/city/City"
import { loireCities } from "./42/LoireCities"

export const auvergneRhoneAlpesCities: { [p: string]: City } = {
  ...rhoneCities,
  ...loireCities
}
