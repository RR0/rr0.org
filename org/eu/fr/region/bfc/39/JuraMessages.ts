import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { JuraCityCode } from "./JuraCityCode.js"
import { saintClaudeMessages } from "./SaintClaude/SaintClaudeMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

type DepMessages = { [key in JuraCityCode]: CityMessages }
export const juraMessages = DepartmentMessages.create<DepMessages>("Jura", {
  [JuraCityCode.SaintClaude]: saintClaudeMessages
})
