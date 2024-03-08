import { chateaudoubleMessages } from "./chateaudouble/ChateaudoubleMessages"
import { DromeCityCode } from "./DromeCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export const dromeMessages = DepartmentMessages.create("Drôme", {
  [DromeCityCode.Chateaudouble]: chateaudoubleMessages
})
