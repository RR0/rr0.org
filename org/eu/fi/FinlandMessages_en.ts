import { nkRegionMessages_en } from "./region/nk/NkRegionMessages_en"
import { CountryMessages } from "../../country/CountryMessages"
import { FinlandRegionsMessagesList } from "./FinlandMessages"

export const finlandMessages_en = new CountryMessages<FinlandRegionsMessagesList>(
  "Finland",
  {
    nk: nkRegionMessages_en
  }
)
