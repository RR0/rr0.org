import { City } from "../../../../country/region/department/city/City.js"
import { meurtheEtMoselleCities } from "./54/MeurtheEtMoselleCities.js"
import { marneCities } from "./51/MarneCities.js"
import { meuseCities } from "./55/MeuseCities.js"
import { basRhinCities } from "./67/BasRhinCities.js"
import { moselleCities } from "./57/MoselleCities.js"
import { vosgesCities } from "./88/VosgesCities.js"
import { ardennesCities } from "./08/ArdennesCities.js"
import { hautRhinCities } from "./68/HautRhinCities.js"

export const grandEstCities: City[] = [
  ...ardennesCities,
  ...basRhinCities,
  ...hautRhinCities,
  ...marneCities,
  ...meurtheEtMoselleCities,
  ...meuseCities,
  ...moselleCities,
  ...vosgesCities
]
