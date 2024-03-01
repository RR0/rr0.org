import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { stEtienne42Messages } from "./stetienne/StEtienneMessages"
import { LoireCityCode } from "./LoireCityCode"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type LoireCityMessagesList = {
  [key in LoireCityCode]: CityMessages
}
const loireCityMessages: LoireCityMessagesList = {
  [LoireCityCode.StEtienne]: stEtienne42Messages
}
export const loireMessages = new DepartmentMessages<LoireCityMessagesList>("Loire", loireCityMessages)
