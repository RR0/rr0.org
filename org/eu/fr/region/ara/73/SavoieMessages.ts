import { saintJeanDeMaurienneMessages } from "./SaintJeanDeMaurienne/SaintJeanDeMaurienneMessages.js"
import { SavoieCityCode } from "./SavoieCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

export const savoieMessages = DepartmentMessages.create("Savoie", {
  [SavoieCityCode.SaintJeanDeMaurienne]: saintJeanDeMaurienneMessages
})
