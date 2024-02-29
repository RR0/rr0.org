import { creuseCities } from "./23/CreuseCities"
import { City } from "../../../../country/region/department/city/City"
import { charenteCities } from "./16/CharenteCities"
import { landesCities } from "./40/LandesCities"
import { charenteMaritimeCities } from "./17/CharenteMaritimeCities"

export const nouvelleAquitaineCities: City[] = [
  ...charenteCities,
  ...charenteMaritimeCities,
  ...creuseCities,
  ...landesCities
]
