import { creuseCities } from "./23/CreuseCities"
import { charenteCities } from "./16/CharenteCities"
import { landesCities } from "./40/LandesCities"
import { charenteMaritimeCities } from "./17/CharenteMaritimeCities"
import { Organization } from "../../../../Organization"

export const nouvelleAquitaineCities: Organization[] = [
  ...charenteCities,
  ...charenteMaritimeCities,
  ...creuseCities,
  ...landesCities
]
