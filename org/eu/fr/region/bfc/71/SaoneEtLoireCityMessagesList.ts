import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { SaoneEtLoireCityCode } from "./SaoneEtLoireCityCode"

export type SaoneEtLoireCityMessagesList = {
  [key in SaoneEtLoireCityCode]: CityMessages
}
