import { RegionMessages } from "../../../country/region/RegionMessages"
import { pinellasMessages_en } from "./pinellas/PinellasMessages_en"

export const floridaMessages_en = new RegionMessages(
  "Florida",
  {
    pinellas: pinellasMessages_en
  }
)
