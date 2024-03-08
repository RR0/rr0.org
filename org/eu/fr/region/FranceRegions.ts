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

export const franceRegions: Organization[] = [
  auvergneRhoneAlpes,
  bourgogneFrancheComte,
  grandEst,
  hautsDeFrance,
  ileDeFrance,
  laReunion,
  nouvelleAquitaine,
  normandie,
  occitanie,
  paca,
  paysDeLoire,
  centreValDeLoire
]
