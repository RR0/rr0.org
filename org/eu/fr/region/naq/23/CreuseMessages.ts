import { chambonMessages } from "./Chambon/ChambonMessages"
import { CreuseCityCode } from "./CreuseCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type DepMessages = { [key in CreuseCityCode]: CityMessages }
export const creuseMessages = DepartmentMessages.create<DepMessages>("Creuse", {
  [CreuseCityCode.ChambonSurVoueize]: chambonMessages
})
