import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { CentreValDeLoireDepartementCode } from "./CentreValDeLoireDepartementCode.js"
import { indreMessages } from "./36/IndreMessages.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { loiretMessages } from "./45/LoiretMessages.js"
import { indreEtLoireMessages } from "./37/IndreEtLoireMessages.js"
import { cherMessages } from "./18/CherMessages.js"

type CentreValDeLoireDepartmentMessagesList = { [key in CentreValDeLoireDepartementCode]: DepartmentMessages<any> }
export const centreValDeLoireMessages = RegionMessages.create<CentreValDeLoireDepartmentMessagesList>(
  "Centre-Val de Loire", {
    [CentreValDeLoireDepartementCode.Cher]: cherMessages,
    [CentreValDeLoireDepartementCode.Indre]: indreMessages,
    [CentreValDeLoireDepartementCode.IndreEtLoire]: indreEtLoireMessages,
    [CentreValDeLoireDepartementCode.Loiret]: loiretMessages
  })
