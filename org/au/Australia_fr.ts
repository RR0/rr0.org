import { CountryMessages } from "../country/CountryMessages.js"
import { westernAustralia_fr } from "./region/wa/WesternAustraliaMessages_fr.js"
import { victoria_fr } from "./region/vic/VictoriaMessages_fr.js"
import { AustraliaMessages } from "./AustraliaMessages.js"
import { southAustralia_fr } from "./region/sa/SouthAustraliaMessages_fr.js"
import { AustraliaRegionCode } from "./region/AustraliaRegionCode.js"
import { newSouthWales_fr } from "./region/nsw/NewSouthWalesMessages_fr.js"

export const australia_fr = CountryMessages.create<AustraliaMessages>("Australie",
  {
    [AustraliaRegionCode.nsw]: newSouthWales_fr,
    sa: southAustralia_fr,
    wa: westernAustralia_fr,
    vic: victoria_fr
  }
)
