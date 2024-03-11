import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { LoiretCityCode } from "./LoiretCityCode"
import { chateaurenardMessages } from "./chateaurenard/ChateaurenardMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { bouMessages } from "./bou/BouMessages"

type IndreCityMessagesList = { [key in LoiretCityCode]: CityMessages }
const loiretCityMessages: IndreCityMessagesList = {
  [LoiretCityCode.Bou]: bouMessages,
  [LoiretCityCode.ChateauRenard]: chateaurenardMessages
}
export const loiretMessages = DepartmentMessages.create<IndreCityMessagesList>("Loiret", loiretCityMessages)
