import { cotesDArmorCities } from "./22/CotesDArmorCities.js"
import { City } from "../../../../country/region/department/city/City.js"
import { illeEtVilaineCities } from "./35/IlleEtVilaineCities.js"
import { finistereCities } from "./29/FinistereCities.js"

export const bretagneCities: City[] = [
  ...cotesDArmorCities,
  ...finistereCities,
  ...illeEtVilaineCities
]
