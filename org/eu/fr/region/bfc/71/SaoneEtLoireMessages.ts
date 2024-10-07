import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { SaoneEtLoireCityCode } from "./SaoneEtLoireCityCode.js"
import { verosvresMessages } from "./Verosvres/VerosvresMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { joncyMessages } from "./Joncy/JoncyMessages.js"

type DepMessages = { [key in SaoneEtLoireCityCode]: CityMessages }
export const saoneEtLoireMessages = DepartmentMessages.create<DepMessages>("Saône-et-Loire", {
  [SaoneEtLoireCityCode.Joncy]: joncyMessages,
  [SaoneEtLoireCityCode.Verosvres]: verosvresMessages
})
