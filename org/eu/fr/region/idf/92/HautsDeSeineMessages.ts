import { HautsDeSeineCityCode } from "./HautsDeSeineCityCode.js"
import { nanterreMessages } from "./Nanterre/NanterreMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { colombesMessages } from "./Colombes/ColombesMessages.js"
import { boisColombesMessages } from "./BoisColombes/BoisColombesMessages.js"

type HautDeSeineCityMessagesList = { [key in HautsDeSeineCityCode]: CityMessages }
export const hautsDeSeineMessages = DepartmentMessages.create<HautDeSeineCityMessagesList>("Hauts-de-Seine", {
  [HautsDeSeineCityCode.BoisColombes]: boisColombesMessages,
  [HautsDeSeineCityCode.Colombes]: colombesMessages,
  [HautsDeSeineCityCode.Nanterre]: nanterreMessages
})
