import { CountryMessages } from "../country/CountryMessages"
import { britishColumbiaMessages_fr } from "./region/bc/BritishColumbiaMessages_fr"

export const canadaMessages_fr = new CountryMessages(
  "Canada",
  {
    bc: britishColumbiaMessages_fr
  }
)
