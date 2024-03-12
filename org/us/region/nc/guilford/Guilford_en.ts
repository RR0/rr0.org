import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { GuilfordCityCode } from "./GuilfordCityCode"
import { greensboroMessages } from "./greensboro/GreensboroMessages"

export const guilford_en = DepartmentMessages.create("Guilford", {
    [GuilfordCityCode.Greensboro]: greensboroMessages
  }
)
