import { City } from "./country/region/department/city/City"
import { canadaCities } from "./ca/region/CanadaCities"
import { franceCities } from "./eu/fr/FranceCities"
import { finlandCities } from "./eu/fi/FinlandCities"
import { usaCities } from "./us/region/UsaCities"
import { CityService } from "./country/region/department/city/CityService"

export const cities: { [p: string]: City } = {
  ...canadaCities,
  ...franceCities,
  ...finlandCities,
  ...usaCities
}

export const cityService = new CityService(cities)
