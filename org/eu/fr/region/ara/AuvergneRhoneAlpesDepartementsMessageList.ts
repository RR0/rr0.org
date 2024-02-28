import { AuvergneRhoneAlpesDepartmentMessagesList } from "./AuvergneRhoneAlpesDepartmentMessagesList"
import { rhoneMessages } from "./69/RhoneMessages"
import { AuvergneRhoneAlpesDepartementCode } from "./AuvergneRhoneAlpesDepartementCode"
import { loireMessages } from "./42/LoireMessages"

export const auvergneRhoneAlpesDepartementsMessageList: AuvergneRhoneAlpesDepartmentMessagesList = {
  [AuvergneRhoneAlpesDepartementCode.Rhone]: rhoneMessages,
  [AuvergneRhoneAlpesDepartementCode.Loire]: loireMessages
}
