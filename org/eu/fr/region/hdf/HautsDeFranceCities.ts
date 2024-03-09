import { City } from "../../../../country/region/department/city/City"
import { nordCities } from "./59/NordCities"
import { pasDeCalaisCities } from "./62/PasDeCalaisCities"

export const hautsDeFranceCities: City[] = [
  ...nordCities,
  ...pasDeCalaisCities
]
