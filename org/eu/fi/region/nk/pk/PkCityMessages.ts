import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { PkCityCode } from "./PkCityCode"

export type PkCityMessagesList = {
  [key in PkCityCode]: CityMessages
}

export const pkCityMessages: PkCityMessagesList = {
  [PkCityCode.Kieksa]: new CityMessages("Lieksa", "Pielisjärvi", "Pielisjärvi-Lieksa")
}
