import { LotEtGaronneCityCode } from "./LotEtGaronneCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { laroqueTimbautMessages } from "./LaroqueTimbaut/LaroqueTimbautMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { pontDuCasseMessages } from "./PontDuCasse/PontDuCasseMessages"

type LandesCityMessagesList = { [key in LotEtGaronneCityCode]: CityMessages }
export const lotEtGaronneMessages = DepartmentMessages.create<LandesCityMessagesList>("Lot-et-Garonne", {
  [LotEtGaronneCityCode.LaroqueTimbaut]: laroqueTimbautMessages,
  [LotEtGaronneCityCode.PontDuCasse]: pontDuCasseMessages
})
