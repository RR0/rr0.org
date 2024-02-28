import { AuvergneRhoneAlpesDepartmentMessagesList } from "./AuvergneRhoneAlpesDepartmentMessagesList"
import { rhoneMessages } from "./69/RhoneMessages"
import { AuvergneRhoneAlpesDepartementCode } from "./AuvergneRhoneAlpesDepartementCode"
import { loireMessages } from "./42/LoireMessages"
import { puyDeDomeMessages } from "./63/RhoneMessages"

export const auvergneRhoneAlpesDepartementsMessageList: AuvergneRhoneAlpesDepartmentMessagesList = {
  [AuvergneRhoneAlpesDepartementCode.Rhone]: rhoneMessages,
  [AuvergneRhoneAlpesDepartementCode.Loire]: loireMessages,
  [AuvergneRhoneAlpesDepartementCode.PuyDeDome]: puyDeDomeMessages
}
