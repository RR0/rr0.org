import { hautesAlpesCities } from "./05/HautesAlpesCities.js"
import { City } from "../../../../country/region/department/city/City.js"
import { vaucluseCities } from "./84/VaucluseCities.js"
import { alpesMaritimesCities } from "./06/AlpesMaritimesCities.js"
import { varCities } from "./83/VarCities.js"
import { bouchesDuRhoneCities } from "./13/BouchesDuRhoneCities.js"
import { alpesDeHauteProvenceCities } from "./04/AlpesDeHauteProvenceCities.js"
import { vendeeCities } from "./85/VendeeCities.js"

export const pacaCities: City[] = [
  ...alpesDeHauteProvenceCities,
  ...alpesMaritimesCities,
  ...bouchesDuRhoneCities,
  ...hautesAlpesCities,
  ...vaucluseCities,
  ...varCities,
  ...vendeeCities
]
