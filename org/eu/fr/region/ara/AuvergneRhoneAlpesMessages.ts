import { AuvergneRhoneAlpesDepartmentMessagesList } from "./AuvergneRhoneAlpesDepartmentMessagesList"
import { AuvergneRhoneAlpesDepartementCode } from "./AuvergneRhoneAlpesDepartementCode"
import { allierMessages } from "./03/AllierMessages"
import { isereMessages } from "./38/IsereMessages"
import { loireMessages } from "./42/LoireMessages"
import { puyDeDomeMessages } from "./63/RhoneMessages"
import { rhoneMessages } from "./69/RhoneMessages"
import { RegionMessages } from "../../../../country/region/RegionMessages"

export const auvergneRhoneAlpesDepartementsMessageList: AuvergneRhoneAlpesDepartmentMessagesList = {
  [AuvergneRhoneAlpesDepartementCode.Allier]: allierMessages,
  [AuvergneRhoneAlpesDepartementCode.Isere]: isereMessages,
  [AuvergneRhoneAlpesDepartementCode.Loire]: loireMessages,
  [AuvergneRhoneAlpesDepartementCode.PuyDeDome]: puyDeDomeMessages,
  [AuvergneRhoneAlpesDepartementCode.Rhone]: rhoneMessages
}
export const auvergneRhoneAlpesMessages = RegionMessages.create("Auvergne-Rhône-Alpes",
  auvergneRhoneAlpesDepartementsMessageList)
