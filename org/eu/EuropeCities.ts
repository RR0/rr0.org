import { finlandCities } from "./fi/FinlandCities"
import { City } from "../country/region/department/city/City"
import { spainCities } from "./es/region/SpainCities"
import { polandCities } from "./pl/region/PolandCities"
import { denmarkCities } from "./dk/DenmarkCities"
import { franceCities } from "./fr/region/FranceCities"

export const europeCities: City[] = [
  ...denmarkCities,
  ...finlandCities,
  ...franceCities,
  ...polandCities,
  ...spainCities
]
