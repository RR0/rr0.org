import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { HautsDeSeineCityCode } from "./HautsDeSeineCityCode"
import { nanterreMessages } from "./nanterre/NanterreMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type HautDeSeineCityMessagesList = { [key in HautsDeSeineCityCode]: CityMessages }

export const hautsDeSeineCityMessages: HautDeSeineCityMessagesList = {
  [HautsDeSeineCityCode.Nanterre]: nanterreMessages
}

export const hautsDeSeineMessages = new DepartmentMessages<HautDeSeineCityMessagesList>("Hauts-de-Seine",
  hautsDeSeineCityMessages)
