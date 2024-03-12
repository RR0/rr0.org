import { elkhartMessages } from "./elkhart/ElkhartMessages"
import { ElkhartCityCode } from "./ElkhartCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const elkhart_fr = DepartmentMessages.create("Comté d'Elkhart", {
  [ElkhartCityCode.Elkhart]: elkhartMessages
})
