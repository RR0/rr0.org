import { finlandCities } from "./fi/FinlandCities"
import { City } from "../country/region/department/city/City"
import { spainCities } from "./es/region/SpainCities"
import { polandCities } from "./pl/region/PolandCities"
import { franceCities } from "./fr/FranceCities"

export const europeCities: City[] = [
  ...spainCities,
  ...finlandCities,
  ...franceCities,
  ...polandCities
]
