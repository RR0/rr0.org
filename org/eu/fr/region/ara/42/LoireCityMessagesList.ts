import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { LoireCityCode } from "./LoireCityCode"

export type LoireCityMessagesList = {
  [key in LoireCityCode]: CityMessages
}
