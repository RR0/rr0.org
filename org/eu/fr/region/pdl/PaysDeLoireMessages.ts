import { RegionMessages } from "../../../../country/region/RegionMessages"
import { PaysDeLoireDepartementCode } from "./PaysDeLoireDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { sartheMessages } from "./72/SartheCityMessages"

export type PayDeLoireDepartmentMessagesList = { [key in PaysDeLoireDepartementCode]: DepartmentMessages }

export const paysDeLoireDepartmentsMessages: PayDeLoireDepartmentMessagesList = {
  [PaysDeLoireDepartementCode.Sarthe]: sartheMessages
}
export const paysDeLoireMessages = new RegionMessages("Pays-de-la-Loire", paysDeLoireDepartmentsMessages)
