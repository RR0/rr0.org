import { CountryMessages } from "../country/CountryMessages"
import { westernAustralia_fr } from "./region/wa/WesternAustraliaMessages_fr"
import { victoria_fr } from "./region/vic/VictoriaMessages_fr"
import { AustraliaMessages } from "./AustraliaMessages"
import { southAustralia_fr } from "./region/sa/SouthAustraliaMessages_fr"
import { AustraliaRegionCode } from "./region/AustraliaRegionCode"
import { newSouthWales_fr } from "./region/nsw/NewSouthWalesMessages_fr"

export const australia_fr = CountryMessages.create<AustraliaMessages>("Australie",
  {
    [AustraliaRegionCode.nsw]: newSouthWales_fr,
    sa: southAustralia_fr,
    wa: westernAustralia_fr,
    vic: victoria_fr
  }
)
