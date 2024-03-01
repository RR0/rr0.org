import { ileDeFrance } from "./idf/Idf"
import { paysDeLoire } from "./pdl/PaysDeLoire"
import { auvergneRhoneAlpes } from "./ara/AuvergneRhoneAlpes"
import { nouvelleAquitaine } from "./naq/NouvelleAquitaine"
import { normandie } from "./nor/Normandie"
import { paca } from "./pac/Paca"
import { bourgogneFrancheComte } from "./bfc/BourgogneFrancheComte"
import { occitanie } from "./occ/Occitanie"
import { Region } from "../../../country/region/Region"
import { hautsDeFrance } from "./hdf/HautsDeFrance"
import { grandEst } from "./ges/GrandEst"
import { laReunion } from "./lre/LaReunion"

export const franceRegions: Region[] = [
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
  paysDeLoire
]
