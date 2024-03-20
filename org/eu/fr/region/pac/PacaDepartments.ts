import { hautesAlpes } from "./05/HautesAlpes"
import { vaucluse } from "./84/Vaucluse"
import { alpesMaritimes } from "./06/AlpesMaritimes"
import { Var } from "./83/Var"
import { bouchesDuRhone } from "./13/BouchesDuRhone"
import { Organization } from "../../../../Organization"
import { alpesDeHauteProvence } from "./04/AlpesDeHauteProvence"
import { vendee } from "./85/Vendee"

export const pacaDepartments: Organization[] = [
  alpesDeHauteProvence,
  alpesMaritimes,
  bouchesDuRhone,
  hautesAlpes,
  vaucluse,
  Var,
  vendee
]
