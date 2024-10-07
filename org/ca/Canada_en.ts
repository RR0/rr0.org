import { CountryMessages } from "../country/CountryMessages.js"
import { britishColumbiaMessages_en } from "./region/bc/BritishColumbiaMessages_en.js"
import { CanadaRegionCode } from "./region/CanadaRegionCode.js"
import { manitobaMessages_en } from "./region/mb/ManitobaMessages_en.js"
import { quebecMessages_en } from "./region/qc/QuebecMessages_en.js"
import { CanadaMessages } from "./CanadaMessages.js"
import { albertaMessages_en } from "./region/ab/AlbertaMessages_en.js"

export const canada_en = CountryMessages.create<CanadaMessages>("Canada",
  {
    [CanadaRegionCode.ab]: albertaMessages_en,
    [CanadaRegionCode.bc]: britishColumbiaMessages_en,
    [CanadaRegionCode.qc]: quebecMessages_en,
    [CanadaRegionCode.mb]: manitobaMessages_en
  }
)
