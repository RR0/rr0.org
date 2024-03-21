import { City } from "../../../../country/region/department/city/City"
import { saoneEtLoireCities } from "./71/SaoneEtLoireCities"
import { coteDOrCities } from "./21/CoteDOrCities"
import { juraCities } from "./39/JuraCities"
import { yonneCities } from "./89/YonneCities"
import { nievreCities } from "./58/NievreCities"
import { morbihanCities } from "./56/MorbihanCities"
import { doubsCities } from "./25/DoubsCities"

export const bourgogneFrancheComteCities: City[] = [
  ...coteDOrCities,
  ...doubsCities,
  ...juraCities,
  ...morbihanCities,
  ...nievreCities,
  ...saoneEtLoireCities,
  ...yonneCities
]
