import { City } from "../../../../country/region/department/city/City"
import { nordCities } from "./59/NordCities"
import { pasDeCalaisCities } from "./62/PasDeCalaisCities"
import { sommeCities } from "./80/SommeCities"
import { aisneCities } from "./02/AisneCities"

export const hautsDeFranceCities: City[] = [
  ...aisneCities,
  ...pasDeCalaisCities,
  ...nordCities,
  ...sommeCities
]
