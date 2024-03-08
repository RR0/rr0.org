import { RegionMessages } from "../../../../country/region/RegionMessages"
import { PaysDeLoireDepartementCode } from "./PaysDeLoireDepartementCode"
import { sartheMessages } from "./72/SartheCityMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export type PayDeLoireDepartmentMessagesList = { [key in PaysDeLoireDepartementCode]: DepartmentMessages<any> }

export const paysDeLoireDepartmentsMessages: PayDeLoireDepartmentMessagesList = {
  [PaysDeLoireDepartementCode.Sarthe]: sartheMessages
}
export const paysDeLoireMessages = RegionMessages.create("Pays-de-la-Loire", paysDeLoireDepartmentsMessages)
