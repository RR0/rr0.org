import { City } from "../../country/region/department/city/City"
import { victoriaCities } from "./vic/VictoriaCities"
import { DepartmentMessages } from "../../country/region/department/city/DepartmentMessages"
import { Organization } from "../../Organization"

export const australiaCities: City[] | Organization<DepartmentMessages>[] = [
  ...victoriaCities
]
