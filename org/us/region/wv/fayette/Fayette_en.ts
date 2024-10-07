import { mountHopeMessages } from "./MountHope/MountHopeMessages.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { FayetteCityCode } from "./FayetteCityCode.js"

export const fayette_en = DepartmentMessages.create("Fayette County", {
  [FayetteCityCode.MountHope]: mountHopeMessages
})
