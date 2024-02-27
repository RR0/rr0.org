import { RegionMessages } from "../../../country/region/RegionMessages"
import { pinellasMessages_fr } from "./pinellas/PinellasMessages_fr"

export const floridaMessages_fr = new RegionMessages(
  "Florida",
  {
    pinellas: pinellasMessages_fr
  }
)
