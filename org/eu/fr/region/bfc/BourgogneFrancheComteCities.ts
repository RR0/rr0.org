import { City } from "../../../../country/region/department/city/City.js"
import { saoneEtLoireCities } from "./71/SaoneEtLoireCities.js"
import { coteDOrCities } from "./21/CoteDOrCities.js"
import { juraCities } from "./39/JuraCities.js"
import { yonneCities } from "./89/YonneCities.js"
import { nievreCities } from "./58/NievreCities.js"
import { morbihanCities } from "./56/MorbihanCities.js"
import { doubsCities } from "./25/DoubsCities.js"

export const bourgogneFrancheComteCities: City[] = [
  ...coteDOrCities,
  ...doubsCities,
  ...juraCities,
  ...morbihanCities,
  ...nievreCities,
  ...saoneEtLoireCities,
  ...yonneCities
]
