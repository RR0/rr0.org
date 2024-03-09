import { City } from "../../../../country/region/department/city/City"
import { saoneEtLoireCities } from "./71/SaoneEtLoireCities"
import { coteDOrCities } from "./21/CoteDOrCities"
import { juraCities } from "./39/JuraCities"

export const bourgogneFrancheComteCities: City[] = [
  ...coteDOrCities,
  ...juraCities,
  ...saoneEtLoireCities
]
