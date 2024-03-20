import { RegionMessages } from "../../../../country/region/RegionMessages"
import { GuadeloupeDepartmentsMessages } from "./GuadeloupeDepartmentsMessages"
import { guadeloupe971Messages_fr } from "./971/Guadeloupe_fr"
import { GuadeloupeDepartementCode } from "./GuadeloupeDepartementCode"

export const guadeloupeRegion_fr = RegionMessages.create<GuadeloupeDepartmentsMessages>("Guadeloupe", {
    [GuadeloupeDepartementCode.Guadeloupe]: guadeloupe971Messages_fr
  }
)
