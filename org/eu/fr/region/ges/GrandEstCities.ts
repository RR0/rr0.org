import { City } from "../../../../country/region/department/city/City"
import { meurtheEtMoselleCities } from "./54/MeurtheEtMoselleCities"
import { marneCities } from "./51/MarneCities"
import { meuseCities } from "./55/MeuseCities"
import { basRhinCities } from "./67/BasRhinCities"
import { moselleCities } from "./57/MoselleCities"

export const grandEstCities: City[] = [
  ...basRhinCities,
  ...marneCities,
  ...meurtheEtMoselleCities,
  ...meuseCities,
  ...moselleCities
]
