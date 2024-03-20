import { City } from "../../../../country/region/department/city/City"
import { saoneEtLoireCities } from "./71/SaoneEtLoireCities"
import { coteDOrCities } from "./21/CoteDOrCities"
import { juraCities } from "./39/JuraCities"
import { yonneCities } from "./89/YonneCities"
import { nievreCities } from "./58/NievreCities"
import { morbihanCities } from "./56/MorbihanCities"

export const bourgogneFrancheComteCities: City[] = [
  ...coteDOrCities,
  ...juraCities,
  ...morbihanCities,
  ...nievreCities,
  ...saoneEtLoireCities,
  ...yonneCities
]
