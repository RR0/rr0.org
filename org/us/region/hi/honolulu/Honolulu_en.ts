import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { HonoluluCityCode } from "./HonoluluCityCode"
import { helemanoMessages } from "./Helemano/HelemanoMessages"

export const honolulu_en = DepartmentMessages.create("Honolulu County", {
  [HonoluluCityCode.Helemano]: helemanoMessages
})
