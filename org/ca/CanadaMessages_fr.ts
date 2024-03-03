import { CountryMessages } from "../country/CountryMessages"
import { britishColumbiaMessages_fr } from "./region/bc/BritishColumbiaMessages_fr"
import { CanadaRegionCode } from "./region/CanadaRegionCode"
import { manitobaMessages_fr } from "./region/mb/ManitobaMessages_fr"
import { quebecMessages_fr } from "./region/qc/QuebecMessages_fr"

export const canadaMessages_fr = new CountryMessages(
  "Canada",
  {
    [CanadaRegionCode.bc]: britishColumbiaMessages_fr,
    [CanadaRegionCode.qc]: quebecMessages_fr,
    [CanadaRegionCode.mb]: manitobaMessages_fr
  }
)
