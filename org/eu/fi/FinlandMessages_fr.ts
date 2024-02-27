import { nkRegionMessages_fr } from "./region/nk/NkRegionMessages_fr"
import { CountryMessages } from "../../country/CountryMessages"
import { FinlandRegionsMessagesList } from "./FinlandMessages"

export const finlandMessages_fr = new CountryMessages<FinlandRegionsMessagesList>(
  "Finlande",
  {
    nk: nkRegionMessages_fr
  }
)
