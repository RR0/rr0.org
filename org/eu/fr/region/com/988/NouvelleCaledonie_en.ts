import { NouvelleCaledonieCityCode } from "./NouvelleCaledonieCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { noumeaMessages } from "./noumea/NoumeaMessages.js"
import { NouvelleCaledonieCityMessages } from "./NouvelleCaledonieMessages.js"

const guadeloupeCityMessages: NouvelleCaledonieCityMessages = {
  [NouvelleCaledonieCityCode.Noumea]: noumeaMessages
}
export const nouvelleCaledonie_en = DepartmentMessages.create<NouvelleCaledonieCityMessages>("New Caledonia",
  guadeloupeCityMessages)
