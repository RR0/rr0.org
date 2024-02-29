import { FranceMessages } from "./FranceMessages"
import { auvergneRhoneAlpesMessages } from "./region/ara/AuvergneRhoneAlpesMessages"
import { idfRegionMessages_fr } from "./region/idf/IdfRegionMessages_fr"
import { norRegionMessages_fr } from "./region/nor/NorRegionMessages_fr"
import { pacaMessages } from "./region/pac/PacaMessages"
import { pdlRegionMessages_fr } from "./region/pdl/PdlRegionMessages_fr"
import { nouvelleAquitaineMessages } from "./region/naq/NouvelleAquitaineMessages"
import { bourgogneFrancheComteMessages } from "./region/bfc/BourgogneFrancheComteMessages"
import { occitanieMessages_en } from "./region/occ/OccitanieMessages_en"
import { hautsDeFranceMessages } from "./region/hdf/HautsDeFranceMessages"

export const franceMessages_en = new FranceMessages(
  "France",
  {
    ara: auvergneRhoneAlpesMessages,
    bfc: bourgogneFrancheComteMessages,
    idf: idfRegionMessages_fr,
    hdf: hautsDeFranceMessages,
    nor: norRegionMessages_fr,
    pac: pacaMessages,
    pdl: pdlRegionMessages_fr,
    naq: nouvelleAquitaineMessages,
    occ: occitanieMessages_en
  })
