import { City } from "../../country/region/department/city/City"
import { victoriaCities } from "./vic/VictoriaCities"
import { CityMessages } from "../../country/region/department/city/CityMessages"
import { Organization } from "../../Organization"

export const australiaCities: City[] | Organization<CityMessages>[] = [
  ...victoriaCities
]
