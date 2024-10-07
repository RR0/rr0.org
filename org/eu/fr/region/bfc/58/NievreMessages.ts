import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { NievreCityCode } from "./NievreCityCode.js"
import { chateauneufValDeBargisMessages } from "./ChateauneufValDeBargis/ChateauneufValDeBargisMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

type DepMessages = { [key in NievreCityCode]: CityMessages }
export const nievreMessages = DepartmentMessages.create<DepMessages>("Nièvre", {
  [NievreCityCode.ChateauneufValDeBargis]: chateauneufValDeBargisMessages
})
