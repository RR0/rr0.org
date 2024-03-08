import { stEtienne42Messages } from "./stetienne/StEtienneMessages"
import { LoireCityCode } from "./LoireCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export const loireMessages = DepartmentMessages.create("Loire", {
  [LoireCityCode.StEtienne]: stEtienne42Messages
})
