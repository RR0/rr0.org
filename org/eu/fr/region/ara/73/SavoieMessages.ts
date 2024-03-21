import { saintJeanDeMaurienneMessages } from "./SaintJeanDeMaurienne/SaintJeanDeMaurienneMessages"
import { SavoieCityCode } from "./SavoieCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export const savoieMessages = DepartmentMessages.create("Savoie", {
  [SavoieCityCode.SaintJeanDeMaurienne]: saintJeanDeMaurienneMessages
})
