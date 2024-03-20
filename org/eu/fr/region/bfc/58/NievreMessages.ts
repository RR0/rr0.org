import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { NievreCityCode } from "./NievreCityCode"
import { chateauneufValDeBargisMessages } from "./ChateauneufValDeBargis/ChateauneufValDeBargisMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type DepMessages = { [key in NievreCityCode]: CityMessages }
export const nievreMessages = DepartmentMessages.create<DepMessages>("Nièvre", {
  [NievreCityCode.ChateauneufValDeBargis]: chateauneufValDeBargisMessages
})
