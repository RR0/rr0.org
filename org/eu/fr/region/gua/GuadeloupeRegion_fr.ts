import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { GuadeloupeDepartmentsMessages } from "./GuadeloupeDepartmentsMessages.js"
import { guadeloupe971Messages_fr } from "./971/Guadeloupe_fr.js"
import { GuadeloupeDepartementCode } from "./GuadeloupeDepartementCode.js"

export const guadeloupeRegion_fr = RegionMessages.create<GuadeloupeDepartmentsMessages>("Guadeloupe", {
    [GuadeloupeDepartementCode.Guadeloupe]: guadeloupe971Messages_fr
  }
)
