import { AuvergneRhoneAlpesDepartmentMessagesList } from "./AuvergneRhoneAlpesDepartmentMessagesList"
import { rhoneMessages } from "./69/RhoneMessages"
import { AuvergneRhoneAlpesDepartementCode } from "./AuvergneRhoneAlpesDepartementCode"
import { loireMessages } from "./42/LoireMessages"
import { puyDeDomeMessages } from "./63/RhoneMessages"
import { allierMessages } from "./03/AllierMessages"
import { isereMessages } from "./38/IsereMessages"

export const auvergneRhoneAlpesDepartementsMessageList: AuvergneRhoneAlpesDepartmentMessagesList = {
  [AuvergneRhoneAlpesDepartementCode.Allier]: allierMessages,
  [AuvergneRhoneAlpesDepartementCode.Isere]: isereMessages,
  [AuvergneRhoneAlpesDepartementCode.Loire]: loireMessages,
  [AuvergneRhoneAlpesDepartementCode.PuyDeDome]: puyDeDomeMessages,
  [AuvergneRhoneAlpesDepartementCode.Rhone]: rhoneMessages
}
