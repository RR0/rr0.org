import { hautesAlpes } from "./05/HautesAlpes.js"
import { vaucluse } from "./84/Vaucluse.js"
import { alpesMaritimes } from "./06/AlpesMaritimes.js"
import { Var } from "./83/Var.js"
import { bouchesDuRhone } from "./13/BouchesDuRhone.js"
import { Organization } from "../../../../Organization.js"
import { alpesDeHauteProvence } from "./04/AlpesDeHauteProvence.js"
import { vendee } from "./85/Vendee.js"

export const pacaDepartments: Organization[] = [
  alpesDeHauteProvence,
  alpesMaritimes,
  bouchesDuRhone,
  hautesAlpes,
  vaucluse,
  Var,
  vendee
]
