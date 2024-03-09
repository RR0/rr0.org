import { saoneEtLoireMessages } from "./71/SaoneEtLoireMessages"
import { BourgogneFrancheComteDepartementCode } from "./BourgogneFrancheComteDepartementCode"
import { coteDOrMessages } from "./21/CoteDOrMessages"
import { BourgogneFrancheComteDepartmentMessagesList } from "./BourgogneFrancheComteMessages"
import { juraMessages } from "./39/JuraMessages"

export const bourgogneFrancheComteDepartementsMessageList: BourgogneFrancheComteDepartmentMessagesList = {
  [BourgogneFrancheComteDepartementCode.CoteDOr]: coteDOrMessages,
  [BourgogneFrancheComteDepartementCode.Jura]: juraMessages,
  [BourgogneFrancheComteDepartementCode.SaoneEtLoire]: saoneEtLoireMessages
}
