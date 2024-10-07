import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { LleidaCityCode } from "./LleidaCityCode.js"
import { lleidaCityMessages_fr } from "./lleida/LleidaCityMessages_fr.js"

export const lleidaMessages_fr = DepartmentMessages.create("Province de Lérida", {
  [LleidaCityCode.Lleida]: lleidaCityMessages_fr
})
