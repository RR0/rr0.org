import { City } from "./country/region/department/city/City"
import { canadaCities } from "./ca/region/CanadaCities"
import { franceCities } from "./eu/fr/FranceCities"
import { finlandCities } from "./eu/fi/FinlandCities"
import { usaCities } from "./us/region/UsaCities"
import { CityService } from "./country/region/department/city/CityService"
import { brazilCities } from "./br/region/BrazilCities"
import { australiaCities } from "./au/region/AustraliaCities"
import { newZealandCities } from "./nz/region/NewZealandCities"

const cities: City[] = [
  ...australiaCities,
  ...brazilCities,
  ...canadaCities,
  ...franceCities,
  ...finlandCities,
  ...newZealandCities,
  ...usaCities
]

export const cityService = new CityService(cities)
