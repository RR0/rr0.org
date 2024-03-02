import { RegionMessages } from "../../../../country/region/RegionMessages"
import { PaysDeLoireDepartementCode } from "./PaysDeLoireDepartementCode"
import { sartheMessages } from "./72/SartheCityMessages"
import { DepartmentMessages } from "../../../../country/region/department/city/DepartmentMessages"

export type PayDeLoireDepartmentMessagesList = { [key in PaysDeLoireDepartementCode]: DepartmentMessages<any> }

export const paysDeLoireDepartmentsMessages: PayDeLoireDepartmentMessagesList = {
  [PaysDeLoireDepartementCode.Sarthe]: sartheMessages
}
export const paysDeLoireMessages = new RegionMessages("Pays-de-la-Loire", paysDeLoireDepartmentsMessages)
