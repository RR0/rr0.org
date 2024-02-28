import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { GersCityCode } from "./GersCityCode"

export type GersCityMessagesList = {
  [key in GersCityCode]: CityMessages
}
