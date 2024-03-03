import { CountryMessages } from "../country/CountryMessages"
import { britishColumbiaMessages_en } from "./region/bc/BritishColumbiaMessages_en"
import { CanadaRegionCode } from "./region/CanadaRegionCode"
import { manitobaMessages_en } from "./region/mb/ManitobaMessages_en"
import { quebecMessages_en } from "./region/qc/QuebecMessages_en"

export const canadaMessages_en = new CountryMessages(
  "Canada",
  {
    [CanadaRegionCode.bc]: britishColumbiaMessages_en,
    [CanadaRegionCode.qc]: quebecMessages_en,
    [CanadaRegionCode.mb]: manitobaMessages_en
  }
)
