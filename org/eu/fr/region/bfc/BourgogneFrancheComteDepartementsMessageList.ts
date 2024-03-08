import { saoneEtLoireMessages } from "./71/SaoneEtLoireMessages"
import { BourgogneFrancheComteDepartementCode } from "./BourgogneFrancheComteDepartementCode"
import { coteDOrMessages } from "./21/CoteDOrMessages"
import { BourgogneFrancheComteDepartmentMessagesList } from "./BourgogneFrancheComteMessages"

export const bourgogneFrancheComteDepartementsMessageList: BourgogneFrancheComteDepartmentMessagesList = {
  [BourgogneFrancheComteDepartementCode.SaoneEtLoire]: saoneEtLoireMessages,
  [BourgogneFrancheComteDepartementCode.CoteDOr]: coteDOrMessages
}
