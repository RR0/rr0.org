import { RegionMessages } from "../../../../country/region/RegionMessages"
import { CentreValDeLoireDepartementCode } from "./CentreValDeLoireDepartementCode"
import { indreMessages } from "./36/IndreMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { loiretMessages } from "./45/LoiretMessages"
import { indreEtLoireMessages } from "./37/IndreEtLoireMessages"
import { cherMessages } from "./18/CherMessages"

type CentreValDeLoireDepartmentMessagesList = { [key in CentreValDeLoireDepartementCode]: DepartmentMessages<any> }
export const centreValDeLoireMessages = RegionMessages.create<CentreValDeLoireDepartmentMessagesList>(
  "Centre-Val de Loire", {
    [CentreValDeLoireDepartementCode.Cher]: cherMessages,
    [CentreValDeLoireDepartementCode.Indre]: indreMessages,
    [CentreValDeLoireDepartementCode.IndreEtLoire]: indreEtLoireMessages,
    [CentreValDeLoireDepartementCode.Loiret]: loiretMessages
  })
