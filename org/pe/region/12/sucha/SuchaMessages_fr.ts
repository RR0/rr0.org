import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"
import { SuchaCityCode } from "./SuchaCityCode"
import { jordanowMessages } from "./jordanow/JordanowMessages"

export const suchaMessages_fr = DepartmentMessages.create("Comté de Sucha", {
  [SuchaCityCode.Jordanow]: jordanowMessages
})
