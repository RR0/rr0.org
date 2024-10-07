import { City } from "../../../../country/region/department/city/City.js"
import { nordCities } from "./59/NordCities.js"
import { pasDeCalaisCities } from "./62/PasDeCalaisCities.js"
import { sommeCities } from "./80/SommeCities.js"
import { aisneCities } from "./02/AisneCities.js"

export const hautsDeFranceCities: City[] = [
  ...aisneCities,
  ...pasDeCalaisCities,
  ...nordCities,
  ...sommeCities
]
