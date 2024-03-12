import { tarrantCities } from "./tarrant/TarrantCities"
import { City } from "../../../country/region/department/city/City"
import { houston } from "./houston/Houston"

export const texasCities: City[] = [
  houston,
  ...tarrantCities
]
