import { City } from "./country/region/department/city/City"
import { canadaCities } from "./ca/region/CanadaCities"
import { usaCities } from "./us/region/UsaCities"
import { CityService } from "./country/region/department/city/CityService"
import { brazilCities } from "./br/region/BrazilCities"
import { australiaCities } from "./au/region/AustraliaCities"
import { newZealandCities } from "./nz/region/NewZealandCities"
import { europeCities } from "./eu/EuropeCities"
import { ukCities } from "./uk/region/UkCities"

const cities: City[] = [
  ...australiaCities,
  ...brazilCities,
  ...canadaCities,
  ...europeCities,
  ...ukCities,
  ...newZealandCities,
  ...usaCities
]

export const cityService = new CityService(cities)
