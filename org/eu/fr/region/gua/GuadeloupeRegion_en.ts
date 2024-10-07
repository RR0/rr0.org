import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { GuadeloupeDepartementCode } from "./GuadeloupeDepartementCode.js"
import { guadeloupe971Messages_en } from "./971/Guadeloupe_en.js"
import { GuadeloupeDepartmentsMessages } from "./GuadeloupeDepartmentsMessages.js"

export const guadeloupeRegion_en = RegionMessages.create<GuadeloupeDepartmentsMessages>("Guadeloupe", {
    [GuadeloupeDepartementCode.Guadeloupe]: guadeloupe971Messages_en
  }
)
