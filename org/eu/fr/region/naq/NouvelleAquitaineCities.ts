import { creuseCities } from "./23/CreuseCities.js"
import { charenteCities } from "./16/CharenteCities.js"
import { landesCities } from "./40/LandesCities.js"
import { charenteMaritimeCities } from "./17/CharenteMaritimeCities.js"
import { Organization } from "../../../../Organization.js"
import { correzeCities } from "./19/CorrezeCities.js"
import { girondeCities } from "./33/GirondeCities.js"
import { lotEtGaronneCities } from "./47/LotEtGaronneCities.js"
import { dordogneCities } from "./24/DordogneCities.js"
import { vienneCities } from "./86/VienneCities.js"
import { pyreneesAtlantiquesCities } from "./64/PyreneesAtlantiquesCities.js"

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
