import { CountryMessages } from "../country/CountryMessages"
import { britishColumbiaMessages_en } from "./region/bc/BritishColumbiaMessages_en"

export const canadaMessages_en = new CountryMessages(
  "Canada",
  {
    bc: britishColumbiaMessages_en
  }
)
