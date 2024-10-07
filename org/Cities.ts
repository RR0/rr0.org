import { City } from "./country/region/department/city/City.js"
import { canadaCities } from "./ca/region/CanadaCities.js"
import { usaCities } from "./us/region/UsaCities.js"
import { CityService } from "./country/region/department/city/CityService.js"
import { brazilCities } from "./br/region/BrazilCities.js"
import { australiaCities } from "./au/region/AustraliaCities.js"
import { newZealandCities } from "./nz/region/NewZealandCities.js"
import { europeCities } from "./eu/EuropeCities.js"
import { ukCities } from "./uk/region/UkCities.js"
import { russiaCities } from "./ru/region/RussiaCities.js"
import { mozambiqueCities } from "./mz/region/MozambiqueCities.js"
import { departmentService } from "./country/region/department/DepartmentService.js"
import { indiaCities } from "./in/region/IndiaCities.js"

const cities: City[] = [
  ...australiaCities,
  ...brazilCities,
  ...canadaCities,
  ...europeCities,
  ...indiaCities,
  ...ukCities,
  ...mozambiqueCities,
  ...newZealandCities,
  ...russiaCities,
  ...usaCities
]

export const cityService = new CityService(cities, "org", departmentService)
