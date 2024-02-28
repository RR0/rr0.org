import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { CharenteCityCode } from "./CharenteCityCode"

export type CharenteCityMessagesList = {
  [key in CharenteCityCode]: CityMessages
}
