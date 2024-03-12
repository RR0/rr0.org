import { monroeCities } from "./monroe/MonroeCities"
import { City } from "../../../country/region/department/city/City"
import { elkhartCities } from "./elkhart/ElkhartCities"
import { whitleyCities } from "./whitley/WhitleyCities"

export const indianaCities: City[] = [
  ...elkhartCities,
  ...monroeCities,
  ...whitleyCities
]
