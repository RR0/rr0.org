import { cotesDArmorCities } from "./22/CotesDArmorCities"
import { City } from "../../../../country/region/department/city/City"
import { illeEtVilaineCities } from "./35/IlleEtVilaineCities"

export const bretagneCities: City[] = [
  ...cotesDArmorCities,
  ...illeEtVilaineCities
]
