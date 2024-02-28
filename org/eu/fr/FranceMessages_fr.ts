import { FranceRegionsMessagesList } from "./FranceMessages"
import { auvergneRhoneAlpesMessages } from "./region/ara/AuvergneRhoneAlpesMessages"
import { idfRegionMessages_fr } from "./region/idf/IdfRegionMessages_fr"
import { norRegionMessages_fr } from "./region/nor/NorRegionMessages_fr"
import { pacaMessages } from "./region/pac/PacaMessages"
import { pdlRegionMessages_fr } from "./region/pdl/PdlRegionMessages_fr"
import { nouvelleAquitaineMessages } from "./region/naq/NouvelleAquitaineMessages"
import { CountryMessages } from "../../country/CountryMessages"
import { occitanieMessages_fr } from "./region/occ/OccitanieMessages_fr"
import { bourgogneFrancheComteMessages } from "./region/bfc/BourgogneFrancheComteMessages"

export const franceMessages_fr = new CountryMessages<FranceRegionsMessagesList>(
  "France",
  {
    ara: auvergneRhoneAlpesMessages,
    bfc: bourgogneFrancheComteMessages,
    idf: idfRegionMessages_fr,
    nor: norRegionMessages_fr,
    pac: pacaMessages,
    pdl: pdlRegionMessages_fr,
    naq: nouvelleAquitaineMessages,
    occ: occitanieMessages_fr
  }
)
