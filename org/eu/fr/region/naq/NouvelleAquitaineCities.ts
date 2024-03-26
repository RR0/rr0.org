import { creuseCities } from "./23/CreuseCities"
import { charenteCities } from "./16/CharenteCities"
import { landesCities } from "./40/LandesCities"
import { charenteMaritimeCities } from "./17/CharenteMaritimeCities"
import { Organization } from "../../../../Organization"
import { correzeCities } from "./19/CorrezeCities"
import { girondeCities } from "./33/GirondeCities"
import { lotEtGaronneCities } from "./47/LotEtGaronneCities"
import { dordogneCities } from "./24/DordogneCities"
import { vienneCities } from "./86/VienneCities"
import { pyreneesAtlantiquesCities } from "./64/PyreneesAtlantiquesCities"

export const nouvelleAquitaineCities: Organization[] = [
  ...charenteCities,
  ...charenteMaritimeCities,
  ...correzeCities,
  ...creuseCities,
  ...dordogneCities,
  ...girondeCities,
  ...landesCities,
  ...lotEtGaronneCities,
  ...pyreneesAtlantiquesCities,
  ...vienneCities
]
