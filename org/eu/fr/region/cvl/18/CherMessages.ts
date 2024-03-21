import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CherCityCode } from "./CherCityCode"
import { chateauneufSurCherMessages } from "./ChateauneufSurCher/ChateauneufSurCherMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type DepMessages = { [key in CherCityCode]: CityMessages }
export const cherMessages = DepartmentMessages.create<DepMessages>("Cher", {
  [CherCityCode.ChateauneufSurCher]: chateauneufSurCherMessages
})
