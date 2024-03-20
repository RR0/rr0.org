import { NouvelleCaledonieCityCode } from "./NouvelleCaledonieCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { noumeaMessages } from "./noumea/NoumeaMessages"
import { NouvelleCaledonieCityMessages } from "./NouvelleCaledonieMessages"

const guadeloupeCityMessages: NouvelleCaledonieCityMessages = {
  [NouvelleCaledonieCityCode.Noumea]: noumeaMessages
}
export const nouvelleCaledonie_fr = DepartmentMessages.create<NouvelleCaledonieCityMessages>("Nouvelle-Caledonie",
  guadeloupeCityMessages)
