import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { BourgogneFrancheComteDepartementCode } from "./BourgogneFrancheComteDepartementCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { coteDOrMessages } from "./21/CoteDOrMessages.js"
import { juraMessages } from "./39/JuraMessages.js"
import { saoneEtLoireMessages } from "./71/SaoneEtLoireMessages.js"
import { yonneMessages } from "./89/YonneMessages.js"
import { nievreMessages } from "./58/NievreMessages.js"
import { morbihanMessages } from "./56/MorbihanMessages.js"
import { doubsMessages } from "./25/DoubsMessages.js"

type BourgogneFrancheComteDepartmentMessagesList = { [key in BourgogneFrancheComteDepartementCode]: DepartmentMessages }
export const bourgogneFrancheComteMessages = RegionMessages.create<BourgogneFrancheComteDepartmentMessagesList>(
  "Bourgogne-Franche-Comté", {
    [BourgogneFrancheComteDepartementCode.CoteDOr]: coteDOrMessages,
    [BourgogneFrancheComteDepartementCode.Doubs]: doubsMessages,
    [BourgogneFrancheComteDepartementCode.Jura]: juraMessages,
    [BourgogneFrancheComteDepartementCode.Morbihan]: morbihanMessages,
    [BourgogneFrancheComteDepartementCode.Nievre]: nievreMessages,
    [BourgogneFrancheComteDepartementCode.SaoneEtLoire]: saoneEtLoireMessages,
    [BourgogneFrancheComteDepartementCode.Yonne]: yonneMessages
  }
)
