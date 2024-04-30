import { CountryMessages } from "../country/CountryMessages"
import { westernAustralia_en } from "./region/wa/WesternAustraliaMessages_en"
import { victoria_en } from "./region/vic/VictoriaMessages_en"
import { AustraliaMessages } from "./AustraliaMessages"
import { southAustralia_en } from "./region/sa/SouthAustraliaMessages_en"
import { AustraliaRegionCode } from "./region/AustraliaRegionCode"
import { newSouthWales_en } from "./region/nsw/NewSouthWalesMessages_en"

export const australia_en = CountryMessages.create<AustraliaMessages>("Australie",
  {
    [AustraliaRegionCode.nsw]: newSouthWales_en,
    sa: southAustralia_en,
    wa: westernAustralia_en,
    vic: victoria_en
  }
)
