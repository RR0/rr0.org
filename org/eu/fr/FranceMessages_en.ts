import { FranceMessages } from "./FranceMessages"
import { auvergneRhoneAlpesMessages } from "./region/ara/AuvergneRhoneAlpesMessages"
import { idfMessages } from "./region/idf/IdfMessages"
import { pacaMessages } from "./region/pac/PacaMessages"
import { paysDeLoireMessages } from "./region/pdl/PaysDeLoireMessages"
import { nouvelleAquitaineMessages } from "./region/naq/NouvelleAquitaineMessages"
import { bourgogneFrancheComteMessages } from "./region/bfc/BourgogneFrancheComteMessages"
import { occitanieMessages_en } from "./region/occ/OccitanieMessages_en"
import { hautsDeFranceMessages } from "./region/hdf/HautsDeFranceMessages"
import { normandieMessages_fr } from "./region/nor/NormandieMessages_fr"
import { grandEstMessages } from "./region/ges/GrandEstMessages"

export const franceMessages_en = new FranceMessages(
  "France",
  {
    ara: auvergneRhoneAlpesMessages,
    bfc: bourgogneFrancheComteMessages,
    ges: grandEstMessages,
    idf: idfMessages,
    hdf: hautsDeFranceMessages,
    nor: normandieMessages_fr,
    pac: pacaMessages,
    pdl: paysDeLoireMessages,
    naq: nouvelleAquitaineMessages,
    occ: occitanieMessages_en
  })
