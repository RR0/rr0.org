import { chambonMessages } from "./chambon/ChambonMessages"
import { CreuseCityCode } from "./CreuseCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type CreuseCityMessagesList = { [key in CreuseCityCode]: CityMessages }
const creuseCityMessages: CreuseCityMessagesList = {
  [CreuseCityCode.ChambonSurVoueize]: chambonMessages
}
export const creuseMessages = DepartmentMessages.create<CreuseCityMessagesList>("Creuse", creuseCityMessages)
