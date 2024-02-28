import { CharenteCityCode } from "./CharenteCityCode"
import { montigne16Messages } from "./montigne/MontigneMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type CharenteCityMessagesList = { [key in CharenteCityCode]: CityMessages }

const charenteCityMessages: CharenteCityMessagesList = {
  [CharenteCityCode.Montigne]: montigne16Messages
}

export const charenteMessages = new DepartmentMessages<CharenteCityMessagesList>("Charente", charenteCityMessages)
