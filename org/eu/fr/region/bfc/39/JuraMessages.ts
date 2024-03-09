import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { JuraCityCode } from "./JuraCityCode"
import { saintClaudeMessages } from "./saintclaude/SaintClaudeMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type JuraCityMessagesList = { [key in JuraCityCode]: CityMessages }
const juraCityMessages: JuraCityMessagesList = {
  [JuraCityCode.SaintClaude]: saintClaudeMessages
}
export const juraMessages = DepartmentMessages.create("Jura", juraCityMessages)
