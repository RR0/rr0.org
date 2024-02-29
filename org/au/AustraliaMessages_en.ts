import { CountryMessages } from "../country/CountryMessages"
import { westernAustralia_en } from "./region/wa/WesternAustraliaMessages_en"
import { victoria_en } from "./region/vic/VictoriaMessages_en"
import { AustraliaMessages } from "./AustraliaMessages"

export const australiaMessages_en = new CountryMessages<AustraliaMessages>(
  "Australie",
  {
    wa: westernAustralia_en,
    vic: victoria_en
  }
)
