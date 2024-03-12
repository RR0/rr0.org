import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { BurlingtonCityCode } from "./BurlingtonCityCode"
import { willingboroMessages } from "./willingboro/WillingboroMessages"

export const burlington_fr = DepartmentMessages.create("Comté de Burlington", {
    [BurlingtonCityCode.Willingboro]: willingboroMessages
  }
)
