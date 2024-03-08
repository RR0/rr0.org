import { City } from "../../../../country/region/department/city/City"
import { saoneEtLoireCities } from "./71/SaoneEtLoireCities"
import { coteDOrCities } from "./21/CoteDOrCities"

export const bourgogneFrancheComteCities: City[] = [
  ...saoneEtLoireCities,
  ...coteDOrCities
]
