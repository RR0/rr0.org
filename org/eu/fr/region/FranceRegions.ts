import { ileDeFrance } from "./idf/Idf"
import { paysDeLoire } from "./pdl/PaysDeLoire"
import { auvergneRhoneAlpes } from "./ara/AuvergneRhoneAlpes"
import { nouvelleAquitaine } from "./naq/NouvelleAquitaine"
import { normandie } from "./nor/Normandie"
import { paca } from "./pac/Paca"
import { bourgogneFrancheComte } from "./bfc/BourgogneFrancheComte"
import { occitanie } from "./occ/Occitanie"
import { hautsDeFrance } from "./hdf/HautsDeFrance"
import { grandEst } from "./ges/GrandEst"
import { laReunion } from "./lre/LaReunion"
import { Organization } from "../../../Organization"
import { centreValDeLoire } from "./cvl/CentreValDeLoire"
import { guadeloupeRegion } from "./gua/GuadeloupeRegion"
import { bretagne } from "./bre/Bretagne"
import { martiniqueRegion } from "./mtq/MartiniqueRegion"
import { collectiviteOutreMer } from "./com/CollectiviteOutreMer"

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
