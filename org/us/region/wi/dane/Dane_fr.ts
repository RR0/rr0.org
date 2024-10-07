import { DaneCityCode } from "./DaneCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { madison_fr } from "./Madison/Madison_fr.js"

export const dane_fr = DepartmentMessages.create("Comté de Dane", {
  [DaneCityCode.madison]: madison_fr
})
