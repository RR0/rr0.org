import { City } from "../../../../country/region/department/city/City"
import { meurtheEtMoselleCities } from "./54/MeurtheEtMoselleCities"
import { marneCities } from "./51/MarneCities"
import { meuseCities } from "./55/MeuseCities"
import { basRhinCities } from "./67/BasRhinCities"
import { moselleCities } from "./57/MoselleCities"
import { vosgesCities } from "./88/VosgesCities"
import { ardennesCities } from "./08/ArdennesCities"

export const grandEstCities: City[] = [
  ...ardennesCities,
  ...basRhinCities,
  ...marneCities,
  ...meurtheEtMoselleCities,
  ...meuseCities,
  ...moselleCities,
  ...vosgesCities
]
