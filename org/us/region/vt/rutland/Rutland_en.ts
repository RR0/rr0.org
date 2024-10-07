import { RutlandCityCode } from "./RutlandCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { rutland_en } from "./Rutland/Rutland_en.js"

export const rutlandCounty_en = DepartmentMessages.create("Rutland County", {
  [RutlandCityCode.Rutland]: rutland_en
})
