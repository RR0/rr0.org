import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { SuchaCityCode } from "./SuchaCityCode"
import { jordanowMessages } from "./jordanow/JordanowMessages"

export const suchaMessages_en = DepartmentMessages.create("Sucha County", {
  [SuchaCityCode.Jordanow]: jordanowMessages
})
