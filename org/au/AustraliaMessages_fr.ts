import { CountryMessages } from "../country/CountryMessages"
import { westernAustralia_fr } from "./region/wa/WesternAustraliaMessages_fr"
import { victoria_fr } from "./region/vic/VictoriaMessages_fr"
import { AustraliaMessages } from "./AustraliaMessages"

export const australiaMessages_fr = new CountryMessages<AustraliaMessages>(
  "Australie",
  {
    wa: westernAustralia_fr,
    vic: victoria_fr
  }
)
