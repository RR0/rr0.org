import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { HonoluluCityCode } from "./HonoluluCityCode.js"
import { helemanoMessages } from "./Helemano/HelemanoMessages.js"

export const honolulu_en = DepartmentMessages.create("Honolulu County", {
  [HonoluluCityCode.Helemano]: helemanoMessages
})
