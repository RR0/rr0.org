import { cotesDArmorCities } from "./22/CotesDArmorCities"
import { City } from "../../../../country/region/department/city/City"
import { illeEtVilaineCities } from "./35/IlleEtVilaineCities"
import { finistereCities } from "./29/FinistereCities"

export const bretagneCities: City[] = [
  ...cotesDArmorCities,
  ...finistereCities,
  ...illeEtVilaineCities
]
