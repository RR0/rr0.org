import { mountHopeMessages } from "./MountHope/MountHopeMessages.js"
import { FayetteCityCode } from "./FayetteCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const fayette_fr = DepartmentMessages.create("Comté de Fayette", {
  [FayetteCityCode.MountHope]: mountHopeMessages
})
