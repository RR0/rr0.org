import { RegionMessages } from "../../../../country/region/RegionMessages"
import { CentreValDeLoireDepartementCode } from "./CentreValDeLoireDepartementCode"
import { indreMessages } from "./36/IndreCityMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { loiretMessages } from "./45/LoiretCityMessages"

export type CentreValDeLoireDepartmentMessagesList = { [key in CentreValDeLoireDepartementCode]: DepartmentMessages<any> }
export const centreValDeLoireDepartmentsMessages: CentreValDeLoireDepartmentMessagesList = {
  [CentreValDeLoireDepartementCode.Indre]: indreMessages,
  [CentreValDeLoireDepartementCode.Loiret]: loiretMessages
}
export const centreValDeLoireMessages = RegionMessages.create("Centre-Val de Loire",
  centreValDeLoireDepartmentsMessages)
