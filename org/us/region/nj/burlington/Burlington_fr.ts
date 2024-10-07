import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { BurlingtonCityCode } from "./BurlingtonCityCode.js"
import { willingboroMessages } from "./willingboro/WillingboroMessages.js"

export const burlington_fr = DepartmentMessages.create("Comté de Burlington", {
    [BurlingtonCityCode.Willingboro]: willingboroMessages
  }
)
