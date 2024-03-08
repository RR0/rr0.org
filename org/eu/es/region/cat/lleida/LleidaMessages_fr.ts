import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { LleidaCityCode } from "./LleidaCityCode"
import { lleidaCityMessages_fr } from "./lleida/LleidaCityMessages_fr"

export const lleidaMessages_fr = DepartmentMessages.create("Province de Lérida", {
  [LleidaCityCode.Lleida]: lleidaCityMessages_fr
})
