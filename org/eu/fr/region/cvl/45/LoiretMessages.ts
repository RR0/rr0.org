import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { LoiretCityCode } from "./LoiretCityCode.js"
import { chateaurenardMessages } from "./chateaurenard/ChateaurenardMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { bouMessages } from "./bou/BouMessages.js"

type IndreCityMessagesList = { [key in LoiretCityCode]: CityMessages }
const loiretCityMessages: IndreCityMessagesList = {
  [LoiretCityCode.Bou]: bouMessages,
  [LoiretCityCode.ChateauRenard]: chateaurenardMessages
}
export const loiretMessages = DepartmentMessages.create<IndreCityMessagesList>("Loiret", loiretCityMessages)
