import { RegionMessages } from "../../../../country/region/RegionMessages"
import { PaysDeLoireDepartementCode } from "./PaysDeLoireDepartementCode"
import { sartheMessages } from "./72/SartheMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { maineEtLoireMessages } from "./49/MaineEtLoireMessages"
import { loireAtlantiqueMessages } from "./44/LoireAtlantiqueMessages"

export type PayDeLoireDepartmentMessagesList = { [key in PaysDeLoireDepartementCode]: DepartmentMessages<any> }

export const paysDeLoireDepartmentsMessages: PayDeLoireDepartmentMessagesList = {
  [PaysDeLoireDepartementCode.LoireAtlantique]: loireAtlantiqueMessages,
  [PaysDeLoireDepartementCode.MaineEtLoire]: maineEtLoireMessages,
  [PaysDeLoireDepartementCode.Sarthe]: sartheMessages
}
export const paysDeLoireMessages = RegionMessages.create("Pays-de-la-Loire", paysDeLoireDepartmentsMessages)
