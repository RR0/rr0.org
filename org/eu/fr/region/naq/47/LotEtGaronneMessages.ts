import { LotEtGaronneCityCode } from "./LotEtGaronneCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { laroqueTimbautMessages } from "./LaroqueTimbaut/LaroqueTimbautMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { pontDuCasseMessages } from "./PontDuCasse/PontDuCasseMessages.js"

type LandesCityMessagesList = { [key in LotEtGaronneCityCode]: CityMessages }
export const lotEtGaronneMessages = DepartmentMessages.create<LandesCityMessagesList>("Lot-et-Garonne", {
  [LotEtGaronneCityCode.LaroqueTimbaut]: laroqueTimbautMessages,
  [LotEtGaronneCityCode.PontDuCasse]: pontDuCasseMessages
})
