import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { SaoneEtLoireCityCode } from "./SaoneEtLoireCityCode"
import { verosvresMessages } from "./Verosvres/VerosvresMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { joncyMessages } from "./Joncy/JoncyMessages"

type DepMessages = { [key in SaoneEtLoireCityCode]: CityMessages }
export const saoneEtLoireMessages = DepartmentMessages.create<DepMessages>("Saône-et-Loire", {
  [SaoneEtLoireCityCode.Joncy]: joncyMessages,
  [SaoneEtLoireCityCode.Verosvres]: verosvresMessages
})
