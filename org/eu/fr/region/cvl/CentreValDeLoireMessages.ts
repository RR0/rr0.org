import { RegionMessages } from "../../../../country/region/RegionMessages"
import { CentreValDeLoireDepartementCode } from "./CentreValDeLoireDepartementCode"
import { indreMessages } from "./36/IndreMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { loiretMessages } from "./45/LoiretMessages"
import { indreEtLoireMessages } from "./37/IndreEtLoireMessages"

export type CentreValDeLoireDepartmentMessagesList = { [key in CentreValDeLoireDepartementCode]: DepartmentMessages<any> }
export const centreValDeLoireDepartmentsMessages: CentreValDeLoireDepartmentMessagesList = {
  [CentreValDeLoireDepartementCode.Indre]: indreMessages,
  [CentreValDeLoireDepartementCode.IndreEtLoire]: indreEtLoireMessages,
  [CentreValDeLoireDepartementCode.Loiret]: loiretMessages
}
export const centreValDeLoireMessages = RegionMessages.create("Centre-Val de Loire",
  centreValDeLoireDepartmentsMessages)
