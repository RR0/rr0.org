import { chambonMessages } from "./chambon/ChambonMessages"
import { CreuseCityCode } from "./CreuseCityCode"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type CreuseCityMessagesList = {
  [key in CreuseCityCode]: CityMessages
}

const creuseCityMessages: CreuseCityMessagesList = {
  [CreuseCityCode.ChambonSurVoueize]: chambonMessages
}

export const creuseMessages = new DepartmentMessages<CreuseCityMessagesList>("Creuse", creuseCityMessages)
