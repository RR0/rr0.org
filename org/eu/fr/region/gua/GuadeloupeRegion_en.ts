import { RegionMessages } from "../../../../country/region/RegionMessages"
import { GuadeloupeDepartementCode } from "./GuadeloupeDepartementCode"
import { guadeloupe971Messages_en } from "./971/Guadeloupe_en"
import { GuadeloupeDepartmentsMessages } from "./GuadeloupeDepartmentsMessages"

export const guadeloupeRegion_en = RegionMessages.create<GuadeloupeDepartmentsMessages>("Guadeloupe", {
    [GuadeloupeDepartementCode.Guadeloupe]: guadeloupe971Messages_en
  }
)
