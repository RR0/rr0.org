import { GardCityCode } from "./GardCityCode"
import { ledignanMessages } from "./ledignan/LedignanMessages"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"

export const gardMessages = DepartmentMessages.create("Gard", {
  [GardCityCode.Ledignan]: ledignanMessages
})
