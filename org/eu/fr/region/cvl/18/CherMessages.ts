import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CherCityCode } from "./CherCityCode.js"
import { chateauneufSurCherMessages } from "./ChateauneufSurCher/ChateauneufSurCherMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

type DepMessages = { [key in CherCityCode]: CityMessages }
export const cherMessages = DepartmentMessages.create<DepMessages>("Cher", {
  [CherCityCode.ChateauneufSurCher]: chateauneufSurCherMessages
})
