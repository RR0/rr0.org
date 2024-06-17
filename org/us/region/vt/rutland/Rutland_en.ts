import { RutlandCityCode } from "./RutlandCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { rutland_en } from "./Rutland/Rutland_en"

export const rutlandCounty_en = DepartmentMessages.create("Rutland County", {
  [RutlandCityCode.Rutland]: rutland_en
})
