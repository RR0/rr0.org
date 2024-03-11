import { HautsDeSeineCityCode } from "./HautsDeSeineCityCode"
import { nanterreMessages } from "./nanterre/NanterreMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type HautDeSeineCityMessagesList = { [key in HautsDeSeineCityCode]: CityMessages }
const hautsDeSeineCityMessages: HautDeSeineCityMessagesList = {
  [HautsDeSeineCityCode.Nanterre]: nanterreMessages
}
export const hautsDeSeineMessages = DepartmentMessages.create<HautDeSeineCityMessagesList>("Hauts-de-Seine",
  hautsDeSeineCityMessages)
