import { finlandCities } from "./fi/FinlandCities.js"
import { City } from "../country/region/department/city/City.js"
import { spainCities } from "./es/region/SpainCities.js"
import { polandCities } from "./pl/region/PolandCities.js"
import { denmarkCities } from "./dk/DenmarkCities.js"
import { franceCities } from "./fr/region/FranceCities.js"

export const europeCities: City[] = [
  ...denmarkCities,
  ...finlandCities,
  ...franceCities,
  ...polandCities,
  ...spainCities
]
