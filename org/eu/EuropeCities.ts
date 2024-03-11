import { finlandCities } from "./fi/FinlandCities"
import { City } from "../country/region/department/city/City"
import { spainCities } from "./es/region/SpainCities"
import { polandCities } from "./pl/region/PolandCities"
import { europeDepartments } from "./EuropeDepartments"

export const europeCities: City[] = [
  ...spainCities,
  ...europeDepartments,
  ...finlandCities,
  ...polandCities
]
