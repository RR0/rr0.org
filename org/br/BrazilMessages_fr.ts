import { CountryMessages } from "../country/CountryMessages"
import { BrazilMessages } from "./BrazilMessages"
import { centralWestMessages_fr } from "./region/cw/CentralWestMessages_fr"

export const brazilMessages_fr = new CountryMessages<BrazilMessages>(
  "Brésil",
  {
    cw: centralWestMessages_fr
  }
)
