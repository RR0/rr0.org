import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { LleidaCityCode } from "./LleidaCityCode.js"
import { lleidaCityMessages_en } from "./lleida/LleidaCityMessages_en.js"

export const lleidaMessages_en = DepartmentMessages.create("Province of Lleida", {
  [LleidaCityCode.Lleida]: lleidaCityMessages_en
})
