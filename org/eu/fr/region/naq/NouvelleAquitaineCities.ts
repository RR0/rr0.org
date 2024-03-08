import { creuseCities } from "./23/CreuseCities"
import { charenteCities } from "./16/CharenteCities"
import { landesCities } from "./40/LandesCities"
import { charenteMaritimeCities } from "./17/CharenteMaritimeCities"
import { Organization } from "../../../../Organization"
import { correzeCities } from "./19/CorrezeCities"

export const nouvelleAquitaineCities: Organization[] = [
  ...charenteCities,
  ...charenteMaritimeCities,
  ...correzeCities,
  ...creuseCities,
  ...landesCities
]
