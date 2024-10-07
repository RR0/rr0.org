import { chambonMessages } from "./Chambon/ChambonMessages.js"
import { CreuseCityCode } from "./CreuseCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

type DepMessages = { [key in CreuseCityCode]: CityMessages }
export const creuseMessages = DepartmentMessages.create<DepMessages>("Creuse", {
  [CreuseCityCode.ChambonSurVoueize]: chambonMessages
})
