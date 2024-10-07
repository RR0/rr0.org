import { tarrantCities } from "./tarrant/TarrantCities.js"
import { City } from "../../../country/region/department/city/City.js"
import { houston } from "./houston/Houston.js"

export const texasCities: City[] = [
  houston,
  ...tarrantCities
]
