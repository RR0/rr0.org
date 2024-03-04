import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"
import { LleidaCityCode } from "./LleidaCityCode"
import { lleidaCityMessages_en } from "./lleida/LleidaCityMessages_en"

export const lleidaMessages_en = DepartmentMessages.create("Province of Lleida", {
  [LleidaCityCode.Lleida]: lleidaCityMessages_en
})
