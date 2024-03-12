import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { BurlingtonCityCode } from "./BurlingtonCityCode"
import { willingboroMessages } from "./willingboro/WillingboroMessages"

export const burlington_en = DepartmentMessages.create("Burlington County", {
    [BurlingtonCityCode.Willingboro]: willingboroMessages
  }
)
