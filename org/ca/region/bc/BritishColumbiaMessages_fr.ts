import { kootenaysMessages_fr } from "./rdck/KootenaysMessages_fr.js"
import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { BritishColumbiaDepartmentCode } from "./BritishColumbiaDepartmentCode.js"

export const britishColumbiaMessages_fr = RegionMessages.create(
  "Colombie Britannique",
  {
    [BritishColumbiaDepartmentCode.kootenays]: kootenaysMessages_fr
  }
)
