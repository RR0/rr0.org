import { HonoluluCityCode } from "./HonoluluCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { helemanoMessages } from "./Helemano/HelemanoMessages.js"

export const honolulu_fr = DepartmentMessages.create("Comté de Honolulu", {
  [HonoluluCityCode.Helemano]: helemanoMessages
})
