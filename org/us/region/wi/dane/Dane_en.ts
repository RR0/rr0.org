import { DaneCityCode } from "./DaneCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { madison_en } from "./Madison/Madison_en.js"

export const dane_en = DepartmentMessages.create("Dane County", {
  [DaneCityCode.madison]: madison_en
})
