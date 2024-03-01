import { hautesAlpesCities } from "./05/HautesAlpesCities"
import { City } from "../../../../country/region/department/city/City"
import { vaucluseCities } from "./84/VaucluseCities"
import { alpesMaritimesCities } from "./06/AlpesMaritimesCities"
import { varCities } from "./83/VarCities"
import { bouchesDuRhoneCities } from "./13/BouchesDuRhoneCities"

export const pacaCities: City[] = [
  ...alpesMaritimesCities,
  ...bouchesDuRhoneCities,
  ...hautesAlpesCities,
  ...vaucluseCities,
  ...varCities
]
