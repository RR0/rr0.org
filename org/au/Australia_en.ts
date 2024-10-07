import { CountryMessages } from "../country/CountryMessages.js"
import { westernAustralia_en } from "./region/wa/WesternAustraliaMessages_en.js"
import { victoria_en } from "./region/vic/VictoriaMessages_en.js"
import { AustraliaMessages } from "./AustraliaMessages.js"
import { southAustralia_en } from "./region/sa/SouthAustraliaMessages_en.js"
import { AustraliaRegionCode } from "./region/AustraliaRegionCode.js"
import { newSouthWales_en } from "./region/nsw/NewSouthWalesMessages_en.js"

export const australia_en = CountryMessages.create<AustraliaMessages>("Australie",
  {
    [AustraliaRegionCode.nsw]: newSouthWales_en,
    sa: southAustralia_en,
    wa: westernAustralia_en,
    vic: victoria_en
  }
)
