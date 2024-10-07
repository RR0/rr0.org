import { elkhartMessages } from "./elkhart/ElkhartMessages.js"
import { ElkhartCityCode } from "./ElkhartCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const elkhart_en = DepartmentMessages.create("Elkhart County", {
  [ElkhartCityCode.Elkhart]: elkhartMessages
})
