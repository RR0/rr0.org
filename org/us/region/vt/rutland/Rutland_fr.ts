import { RutlandCityCode } from "./RutlandCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { rutland_fr } from "./Rutland/Rutland_fr"

export const rutlandCounty_fr = DepartmentMessages.create("Comté de Rutland", {
  [RutlandCityCode.Rutland]: rutland_fr
})
