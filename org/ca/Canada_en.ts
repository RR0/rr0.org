import { CountryMessages } from "../country/CountryMessages"
import { britishColumbiaMessages_en } from "./region/bc/BritishColumbiaMessages_en"
import { CanadaRegionCode } from "./region/CanadaRegionCode"
import { manitobaMessages_en } from "./region/mb/ManitobaMessages_en"
import { quebecMessages_en } from "./region/qc/QuebecMessages_en"
import { CanadaMessages } from "./CanadaMessages"
import { albertaMessages_en } from "./region/ab/AlbertaMessages_en"

export const canada_en = CountryMessages.create<CanadaMessages>("Canada",
  {
    [CanadaRegionCode.ab]: albertaMessages_en,
    [CanadaRegionCode.bc]: britishColumbiaMessages_en,
    [CanadaRegionCode.qc]: quebecMessages_en,
    [CanadaRegionCode.mb]: manitobaMessages_en
  }
)
