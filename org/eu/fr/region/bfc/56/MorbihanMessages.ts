import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { MorbihanCityCode } from "./MorbihanCityCode.js"
import { locmineMessages } from "./Locmine/LocmineMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

type DepMessages = { [key in MorbihanCityCode]: CityMessages }
export const morbihanMessages = DepartmentMessages.create<DepMessages>("Morbihan", {
  [MorbihanCityCode.Locmine]: locmineMessages
})
