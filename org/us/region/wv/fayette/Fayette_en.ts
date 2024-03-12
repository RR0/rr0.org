import { mountHopeMessages } from "./MountHope/MountHopeMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { FayetteCityCode } from "./FayetteCityCode"

export const fayette_en = DepartmentMessages.create("Fayette County", {
  [FayetteCityCode.MountHope]: mountHopeMessages
})
