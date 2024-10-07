import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { SuchaCityCode } from "./SuchaCityCode.js"
import { jordanowMessages } from "./jordanow/JordanowMessages.js"

export const suchaMessages_fr = DepartmentMessages.create("Comté de Sucha", {
  [SuchaCityCode.Jordanow]: jordanowMessages
})
