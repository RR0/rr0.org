import { franceCities } from "./fr/FranceCities"
import { finlandCities } from "./fi/FinlandCities"
import { City } from "../country/region/department/city/City"
import { spainCities } from "./es/region/SpainCities"

export const europeCities: City[] = [
  ...spainCities,
  ...franceCities,
  ...finlandCities
]
