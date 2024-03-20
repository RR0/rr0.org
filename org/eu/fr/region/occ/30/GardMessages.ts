import { GardCityCode } from "./GardCityCode"
import { ledignanMessages } from "./ledignan/LedignanMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { stGillesMessages } from "./SaintGilles/StGillesMessages"

export const gardMessages = DepartmentMessages.create<{ [key in GardCityCode]: CityMessages }>("Gard", {
  [GardCityCode.Ledignan]: ledignanMessages,
  [GardCityCode.SaintGilles]: stGillesMessages
})
