import { CountryMessages } from "../country/CountryMessages"
import { BrazilMessages } from "./BrazilMessages"
import { centralWestMessages_en } from "./region/cw/CentralWestMessages_en"

export const brazilMessages_en = new CountryMessages<BrazilMessages>(
  "Brazil",
  {
    cw: centralWestMessages_en
  }
)
