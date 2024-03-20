import { HautsDeSeineCityCode } from "./HautsDeSeineCityCode"
import { nanterreMessages } from "./Nanterre/NanterreMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { colombesMessages } from "./Colombes/ColombesMessages"

type HautDeSeineCityMessagesList = { [key in HautsDeSeineCityCode]: CityMessages }
export const hautsDeSeineMessages = DepartmentMessages.create<HautDeSeineCityMessagesList>("Hauts-de-Seine", {
  [HautsDeSeineCityCode.Colombes]: colombesMessages,
  [HautsDeSeineCityCode.Nanterre]: nanterreMessages
})
