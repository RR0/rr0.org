import { PieksamakiCityCode } from "./PieksamakiCityCode.js"
import { pieksamakiMessages } from "./Pieksamaki/PieksamakiMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

type PkCityMessagesList = { [key in PieksamakiCityCode]: CityMessages }
export const pieksamakiCityMessages: PkCityMessagesList = {
  [PieksamakiCityCode.Pieksamaki]: pieksamakiMessages
}
