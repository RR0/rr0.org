import { HonoluluCityCode } from "./HonoluluCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { helemanoMessages } from "./Helemano/HelemanoMessages"

export const honolulu_fr = DepartmentMessages.create("Comté de Honolulu", {
  [HonoluluCityCode.Helemano]: helemanoMessages
})
