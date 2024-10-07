import { chateaudoubleMessages } from "./Chateaudouble/ChateaudoubleMessages.js"
import { DromeCityCode } from "./DromeCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

export const dromeMessages = DepartmentMessages.create("Drôme", {
  [DromeCityCode.Chateaudouble]: chateaudoubleMessages
})
