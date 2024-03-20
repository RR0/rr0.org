import { RegionMessages } from "../../../../country/region/RegionMessages"
import { BourgogneFrancheComteDepartementCode } from "./BourgogneFrancheComteDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { coteDOrMessages } from "./21/CoteDOrMessages"
import { juraMessages } from "./39/JuraMessages"
import { saoneEtLoireMessages } from "./71/SaoneEtLoireMessages"
import { yonneMessages } from "./89/YonneMessages"

type BourgogneFrancheComteDepartmentMessagesList = { [key in BourgogneFrancheComteDepartementCode]: DepartmentMessages }
export const bourgogneFrancheComteMessages = RegionMessages.create<BourgogneFrancheComteDepartmentMessagesList>(
  "Bourgogne-Franche-Comté", {
    [BourgogneFrancheComteDepartementCode.CoteDOr]: coteDOrMessages,
    [BourgogneFrancheComteDepartementCode.Jura]: juraMessages,
    [BourgogneFrancheComteDepartementCode.SaoneEtLoire]: saoneEtLoireMessages,
    [BourgogneFrancheComteDepartementCode.Yonne]: yonneMessages
  }
)
