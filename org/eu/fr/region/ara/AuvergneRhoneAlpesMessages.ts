import { AuvergneRhoneAlpesDepartementCode } from "./AuvergneRhoneAlpesDepartementCode.js"
import { allierMessages } from "./03/AllierMessages.js"
import { isereMessages } from "./38/IsereMessages.js"
import { loireMessages } from "./42/LoireMessages.js"
import { puyDeDomeMessages } from "./63/PuyDeDomeMessages.js"
import { rhoneMessages } from "./69/RhoneMessages.js"
import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { dromeMessages } from "./26/DromeMessages.js"
import { OrganizationMessages } from "../../../../OrganizationMessages.js"
import { ardecheMessages } from "./07/ArdecheMessages.js"
import { cantalMessages } from "./15/CantalMessages.js"
import { ainMessages } from "./01/AinMessages.js"
import { savoieMessages } from "./73/SavoieMessages.js"

type AuvergneRhoneAlpesDepartmentMessagesList = { [key in AuvergneRhoneAlpesDepartementCode]: OrganizationMessages }
export const auvergneRhoneAlpesMessages = RegionMessages.create<AuvergneRhoneAlpesDepartmentMessagesList>(
  "Auvergne-Rhône-Alpes",
  {
    [AuvergneRhoneAlpesDepartementCode.Ain]: ainMessages,
    [AuvergneRhoneAlpesDepartementCode.Allier]: allierMessages,
    [AuvergneRhoneAlpesDepartementCode.Ardeche]: ardecheMessages,
    [AuvergneRhoneAlpesDepartementCode.Cantal]: cantalMessages,
    [AuvergneRhoneAlpesDepartementCode.Drome]: dromeMessages,
    [AuvergneRhoneAlpesDepartementCode.Isere]: isereMessages,
    [AuvergneRhoneAlpesDepartementCode.Loire]: loireMessages,
    [AuvergneRhoneAlpesDepartementCode.PuyDeDome]: puyDeDomeMessages,
    [AuvergneRhoneAlpesDepartementCode.Rhone]: rhoneMessages,
    [AuvergneRhoneAlpesDepartementCode.Savoie]: savoieMessages
  })
