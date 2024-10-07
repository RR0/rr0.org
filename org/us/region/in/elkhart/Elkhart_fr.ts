import { elkhartMessages } from "./elkhart/ElkhartMessages.js"
import { ElkhartCityCode } from "./ElkhartCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const elkhart_fr = DepartmentMessages.create("Comté d'Elkhart", {
  [ElkhartCityCode.Elkhart]: elkhartMessages
})
