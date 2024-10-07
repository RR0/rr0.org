import { GardCityCode } from "./GardCityCode.js"
import { ledignanMessages } from "./ledignan/LedignanMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { stGillesMessages } from "./SaintGilles/StGillesMessages.js"

export const gardMessages = DepartmentMessages.create<{ [key in GardCityCode]: CityMessages }>("Gard", {
  [GardCityCode.Ledignan]: ledignanMessages,
  [GardCityCode.SaintGilles]: stGillesMessages
})
