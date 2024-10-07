import { ileDeFrance } from "./idf/Idf.js"
import { paysDeLoire } from "./pdl/PaysDeLoire.js"
import { auvergneRhoneAlpes } from "./ara/AuvergneRhoneAlpes.js"
import { nouvelleAquitaine } from "./naq/NouvelleAquitaine.js"
import { normandie } from "./nor/Normandie.js"
import { paca } from "./pac/Paca.js"
import { bourgogneFrancheComte } from "./bfc/BourgogneFrancheComte.js"
import { occitanie } from "./occ/Occitanie.js"
import { hautsDeFrance } from "./hdf/HautsDeFrance.js"
import { grandEst } from "./ges/GrandEst.js"
import { laReunion } from "./lre/LaReunion.js"
import { Organization } from "../../../Organization.js"
import { centreValDeLoire } from "./cvl/CentreValDeLoire.js"
import { guadeloupeRegion } from "./gua/GuadeloupeRegion.js"
import { bretagne } from "./bre/Bretagne.js"
import { martiniqueRegion } from "./mtq/MartiniqueRegion.js"
import { collectiviteOutreMer } from "./com/CollectiviteOutreMer.js"

export const franceRegions: Organization[] = [
  auvergneRhoneAlpes,
  bourgogneFrancheComte,
  bretagne,
  centreValDeLoire,
  collectiviteOutreMer,
  grandEst,
  guadeloupeRegion,
  hautsDeFrance,
  ileDeFrance,
  laReunion,
  martiniqueRegion,
  nouvelleAquitaine,
  normandie,
  occitanie,
  paca,
  paysDeLoire
]
