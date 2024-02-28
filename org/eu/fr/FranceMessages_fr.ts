import { FranceRegionsMessagesList } from "./FranceMessages"
import { auvergneRhoneAlpesMessages } from "./region/ara/AuvergneRhoneAlpesMessages"
import { idfRegionMessages_fr } from "./region/idf/IdfRegionMessages_fr"
import { norRegionMessages_fr } from "./region/nor/NorRegionMessages_fr"
import { pacRegionMessages_fr } from "./region/pac/PacRegionMessages_fr"
import { pdlRegionMessages_fr } from "./region/pdl/PdlRegionMessages_fr"
import { naqRegionMessages_fr } from "./region/naq/NaqRegionMessages_fr"
import { CountryMessages } from "../../country/CountryMessages"

export const franceMessages_fr = new CountryMessages<FranceRegionsMessagesList>(
  "France",
  {
    ara: auvergneRhoneAlpesMessages,
    idf: idfRegionMessages_fr,
    nor: norRegionMessages_fr,
    pac: pacRegionMessages_fr,
    pdl: pdlRegionMessages_fr,
    naq: naqRegionMessages_fr
  }
)
