import { CountryMessages } from "../country/CountryMessages.js"
import { britishColumbiaMessages_fr } from "./region/bc/BritishColumbiaMessages_fr.js"
import { CanadaRegionCode } from "./region/CanadaRegionCode.js"
import { manitobaMessages_fr } from "./region/mb/ManitobaMessages_fr.js"
import { quebecMessages_fr } from "./region/qc/QuebecMessages_fr.js"
import { albertaMessages_fr } from "./region/ab/AlbertaMessages_fr.js"

export const canada_fr = CountryMessages.create("Canada", {
  [CanadaRegionCode.ab]: albertaMessages_fr,
    [CanadaRegionCode.bc]: britishColumbiaMessages_fr,
    [CanadaRegionCode.qc]: quebecMessages_fr,
    [CanadaRegionCode.mb]: manitobaMessages_fr
  }
)
