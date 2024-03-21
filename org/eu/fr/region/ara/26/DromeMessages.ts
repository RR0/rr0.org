import { chateaudoubleMessages } from "./Chateaudouble/ChateaudoubleMessages"
import { DromeCityCode } from "./DromeCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export const dromeMessages = DepartmentMessages.create("Drôme", {
  [DromeCityCode.Chateaudouble]: chateaudoubleMessages
})
