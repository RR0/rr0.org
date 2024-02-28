import { CreuseCityCode } from "./CreuseCityCode"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export type CreuseCityMessagesList = {
  [key in CreuseCityCode]: CityMessages
}
