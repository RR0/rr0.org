import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { RhoneCityCode } from "./RhoneCityCode"

export type RhoneCityMessagesList = {
  [key in RhoneCityCode]: CityMessages
}
