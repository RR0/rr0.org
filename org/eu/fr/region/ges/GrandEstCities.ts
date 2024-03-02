import { City } from "../../../../country/region/department/city/City"
import { meurtheEtMoselleCities } from "./54/MeurtheEtMoselleCities"
import { marneCities } from "./51/MarneCities"

export const grandEstCities: City[] = [
  ...marneCities,
  ...meurtheEtMoselleCities
]
