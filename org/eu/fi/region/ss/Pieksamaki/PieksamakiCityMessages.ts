import { PieksamakiCityCode } from "./PieksamakiCityCode"
import { pieksamakiMessages } from "./Pieksamaki/PieksamakiMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type PkCityMessagesList = { [key in PieksamakiCityCode]: CityMessages }
export const pieksamakiCityMessages: PkCityMessagesList = {
  [PieksamakiCityCode.Pieksamaki]: pieksamakiMessages
}
